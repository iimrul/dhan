import React, { useState, useEffect, useRef } from 'react';
// FIX: Import GoogleGenAI and Chat types for Gemini API interaction.
import { GoogleGenAI, Chat } from "@google/genai";
// FIX: Import necessary icons for the UI.
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Initialize the chat instance
        // FIX: Initialize GoogleGenAI with API key from environment variables.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        // FIX: Create a chat session with a specific model and system instruction.
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are a helpful AI assistant for 'AmaderDhan', an application dedicated to helping Bangladeshi rice farmers with sustainable and organic farming. Your name is 'Dhan-Bot'. Answer questions about native rice seeds, soil health, marketplace products, and general farming advice relevant to Bangladesh. Keep your answers concise and friendly."
            }
        });
        setChat(newChat);
        setMessages([
            { role: 'model', text: "Hello! I'm Dhan-Bot. How can I help you with your farming today?" }
        ]);
    }, []);
    
    useEffect(() => {
        // Auto-scroll to the latest message
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!chat || !currentInput.trim()) return;

        const userMessage: Message = { role: 'user', text: currentInput };
        setMessages(prev => [...prev, userMessage]);
        setCurrentInput('');
        setIsLoading(true);

        try {
            // FIX: Use sendMessageStream for a streaming response.
            const stream = await chat.sendMessageStream({ message: userMessage.text });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            // FIX: Iterate through the stream and update the UI incrementally.
            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-brand-green text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform z-40"
                aria-label="Open Chatbot"
            >
                <AnimatePresence>
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatBubbleIcon className="w-8 h-8" />}
                </AnimatePresence>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                        className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[60vh] bg-white rounded-2xl shadow-2xl flex flex-col z-40 origin-bottom-right"
                    >
                        <header className="p-4 bg-brand-green text-white rounded-t-2xl flex justify-between items-center">
                            <h3 className="font-bold text-lg">Chat with Dhan-Bot</h3>
                        </header>
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl mb-2 ${msg.role === 'user' ? 'bg-brand-yellow text-gray-800 rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text || '...'}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <footer className="p-4 border-t bg-white rounded-b-2xl">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                                    placeholder="Ask a question..."
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light-green"
                                    disabled={isLoading}
                                />
                                <button onClick={handleSendMessage} disabled={isLoading || !currentInput.trim()} className="bg-brand-green text-white p-2 rounded-lg disabled:bg-gray-400 transition-colors">
                                    {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <SendIcon className="w-6 h-6" />}
                                </button>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
