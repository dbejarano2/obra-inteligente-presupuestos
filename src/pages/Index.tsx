
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Send, Calculator, Home, Palette, Wrench, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface BudgetItem {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface BudgetSection {
  title: string;
  icon: any;
  items: BudgetItem[];
  isOpen: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente especializado en presupuestos de obra. Cuéntame sobre tu proyecto y te ayudaré a generar un presupuesto detallado. ¿Qué tipo de obra necesitas presupuestar?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [budgetSections, setBudgetSections] = useState<BudgetSection[]>([
    {
      title: 'Albañilería',
      icon: Home,
      items: [
        { name: 'Construcción de muros', quantity: 45, unit: 'm²', unitPrice: 65, total: 2925 },
        { name: 'Colocación de azulejos', quantity: 25, unit: 'm²', unitPrice: 35, total: 875 }
      ],
      isOpen: true
    },
    {
      title: 'Ventanas',
      icon: Calculator,
      items: [
        { name: 'Ventanas de aluminio', quantity: 4, unit: 'ud', unitPrice: 280, total: 1120 },
        { name: 'Cristales dobles', quantity: 4, unit: 'm²', unitPrice: 45, total: 180 }
      ],
      isOpen: false
    },
    {
      title: 'Pintura',
      icon: Palette,
      items: [
        { name: 'Pintura interior', quantity: 120, unit: 'm²', unitPrice: 12, total: 1440 },
        { name: 'Pintura exterior', quantity: 80, unit: 'm²', unitPrice: 15, total: 1200 }
      ],
      isOpen: false
    },
    {
      title: 'Fontanería',
      icon: Wrench,
      items: [
        { name: 'Instalación de tuberías', quantity: 1, unit: 'Global', unitPrice: 850, total: 850 },
        { name: 'Grifería', quantity: 3, unit: 'ud', unitPrice: 120, total: 360 }
      ],
      isOpen: false
    },
    {
      title: 'Electricidad',
      icon: Zap,
      items: [
        { name: 'Instalación eléctrica', quantity: 1, unit: 'Global', unitPrice: 1200, total: 1200 },
        { name: 'Puntos de luz', quantity: 12, unit: 'ud', unitPrice: 45, total: 540 }
      ],
      isOpen: false
    }
  ]);

  const totalBudget = budgetSections.reduce((total, section) => 
    total + section.items.reduce((sectionTotal, item) => sectionTotal + item.total, 0), 0
  );

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "He actualizado el presupuesto basándome en tu solicitud. Puedes ver los cambios en el panel de la derecha. ¿Hay alguna modificación específica que te gustaría hacer?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const toggleSection = (index: number) => {
    setBudgetSections(prev => prev.map((section, i) => 
      i === index ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Generador de Presupuestos de Obra
          </h1>
          <p className="text-slate-600">
            Interactúa con nuestro asistente IA para generar presupuestos detallados
          </p>
        </div>

        {/* Total Budget Card */}
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium opacity-90">Presupuesto Total</h2>
                <p className="text-3xl font-bold">{formatCurrency(totalBudget)}</p>
              </div>
              <Calculator className="h-12 w-12 opacity-80" />
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat Section */}
          <Card className="h-[600px] flex flex-col shadow-lg border-0">
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                Asistente de Presupuestos
              </h3>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800 rounded-bl-none'
                          : 'bg-blue-600 text-white rounded-br-none'
                      } shadow-md`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe tu proyecto o solicita modificaciones..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Budget Breakdown */}
          <Card className="h-[600px] shadow-lg border-0">
            <div className="p-4 border-b bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
              <h3 className="font-semibold">Desglose del Presupuesto</h3>
            </div>
            
            <ScrollArea className="h-[544px] p-4">
              <div className="space-y-3">
                {budgetSections.map((section, index) => (
                  <Collapsible
                    key={section.title}
                    open={section.isOpen}
                    onOpenChange={() => toggleSection(index)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <section.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-800">{section.title}</h4>
                            <p className="text-sm text-gray-500">
                              {formatCurrency(section.items.reduce((total, item) => total + item.total, 0))}
                            </p>
                          </div>
                        </div>
                        {section.isOpen ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="mt-2 space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500 ml-4"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800 text-sm">{item.name}</h5>
                              <p className="text-xs text-gray-500">
                                {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                {formatCurrency(item.total)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
