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
      question: "Gdzie śpimy?",
      answer: "Goście weselni mają wykupiony nocleg wraz ze śniadaniem w Hotelu Campanille Warszawa Północ, zameldowanie od godziny 14:00 - 15.08.2026 oraz wymeldowanie o godzinie 12:00 - 16.08.2026"
    },
    {
      question: "Czy w hotelu znajduje się bar?",
      answer: "Oczywiście! Bar jest otwarty - można tam zrobić mały \"before\"."
    },
    {
      question: "Czy będzie transport?",
      answer: "Tak, będzie zapewniony transport. Goście zostawiają swoje auta pod salą weselną, a w nocy będą organizowane transfery, które przewiozą wszystkich do hotelu. Następnego dnia, po wymeldowaniu, będzie czekał transport powrotny, który podwiezie gości pod salę, do ich samochodów."
    },
    {
      question: "O której godzinie zaczyna się ślub?",
      answer: "16:30"
    },
    {
      question: "Jak potwierdzić obecność?",
      answer: "Na tej stronie znajduje się specjalny formularz, w którym możecie potwierdzić swoją obecność, wskazać preferencje dotyczące diety oraz zaznaczyć, czy będziecie korzystać z noclegu"
    },
    {
      question: "Co z prezentami?",
      answer: "Sam fakt, że będziecie z nami w tym dniu, to dla nas najpiękniejszy prezent. Jeśli jednak chcielibyście coś podarować, delikatnie podpowiadamy, że marzenia najłatwiej spełnia się w kopercie ❤️"
    },
    {
      question: "Czy trzeba mieć wygodne buty?",
      answer: "Zdecydowanie tak! Szpilki piękne, ale parkiet długi - więc warto mieć coś na zmianę, jeśli planujecie tańczyć do rana!"
    },
    {
      question: "O której kończy się wesele?",
      answer: "A kto by to wiedział! Jak tylko skończy się zabawa na sali, Młodzi zapraszają chętnych na after na glampingu"
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