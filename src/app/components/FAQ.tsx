"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#003E3C]/10 last:border-b-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={onClick}
      >
        <span className="text-xl font-serif text-[#293238]">{question}</span>
        <ChevronDownIcon
          className={`w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] flex-shrink-0 text-[#003E3C] stroke-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-fit-content overflow-y-auto mb-6' : 'max-h-0'}`}
      >
        <p className="text-gray-600 text-lg leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Jak dojechać na miejsce imprezy?",
      answer: "Najlepiej jak wszyscy będą jechać za Nami."
    },
    {
      question: "Czy będzie nocleg?",
      answer: "Tak, prosimy jednak o jak najszybszą decyzję kto będzie korzystał z noclegu:)"
    },
    {
      question: "Gdzie i kiedy będzie można złożyć życzenia?",
      answer: "Według Nas najlepszym rozwiązaniem będzie już na miejscu, na sali."
    },
    {
      question: "Czy są poprawiny?",
      answer: "Oczywiście. Natomiast prosimy wszystkich, aby potwierdzili swoją obecność drugiego dnia, najszybciej jak się da :)"
    },
    {
      question: "Czy będzie transfer sala-> hotel?",
      answer: "Tak,przewidujemy :)"
    }
  ];

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-[var(--background-color)]" id="faq">
      <div className="container mx-auto px-12 md:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">FAQ</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Odpowiedzi na najczęściej zadawane pytania. Jeśli nie znaleźliście odpowiedzi na swoje pytanie, skontaktujcie się z nami!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}