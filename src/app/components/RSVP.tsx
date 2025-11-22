"use client";
import React, { useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface AdditionalGuest {
  name: string;
  diet: string;
}

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: 'tak',
    diet: 'standard',
    accommodation: 'nie',
    afterparty: 'nie',
    message: ''
  });
  const [additionalGuests, setAdditionalGuests] = useState<AdditionalGuest[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleGuestsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const guestCount = parseInt(e.target.value);
    setFormData({ ...formData, guests: e.target.value });
    if (guestCount > 1) {
      const newGuests = Array(guestCount - 1)
        .fill(null)
        .map((_, index) => {
          return (
            additionalGuests[index] || {
              name: `${formData.name} (os.${index + 2})`,
              diet: 'standard',
            }
          );
        });
      setAdditionalGuests(newGuests);
    } else {
      setAdditionalGuests([]);
    }
  };

  const handleAdditionalGuestChange = (index: number, field: keyof AdditionalGuest, value: string) => {
    const updatedGuests = [...additionalGuests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setAdditionalGuests(updatedGuests);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    const submissionData = { ...formData, additionalGuests };
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwzi5uTljNiolDsveLqqnTln965hrCOB4E9s-v6PC35LBnCJ0nIskgFGLOTdzH8VqBVWA/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        }
      );
      setSubmitStatus('success');
      setShowPopup(true);
    } catch (error) {
      console.error("RSVP error:", error);
      setSubmitStatus('error');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="bg-[var(--background-color)] scroll-mt-24 relative">
      {/* ✅ MODAL */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full text-center">
            {submitStatus === 'success' && (
              <>
                <div className="text-4xl text-green-600 mb-3">✓</div>
                <h3 className="text-xl font-bold mb-2">Dziękujemy!</h3>
                <p className="mb-6">Twoje potwierdzenie zostało wysłane.<br/>Do zobaczenia na weselu!</p>
              </>
            )}
            {submitStatus === 'error' && (
              <>
                <div className="text-4xl text-red-600 mb-3">✕</div>
                <h3 className="text-xl font-bold mb-2">Coś poszło nie tak</h3>
                <p className="mb-6">Spróbuj ponownie za chwilę.</p>
              </>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white px-6 py-2 rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-12 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Potwierdź obecność</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Bardzo zależy nam na tym, abyście byli z nami w tym wyjątkowym dniu. 
            Prosimy, abyście potwierdzili swoją obecność do 29 lipca 2026 roku.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-6 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-[#003E3C]/10">
            {/* Imię i nazwisko */}
            <div>
              <label htmlFor="name" className="block text-lg font-serif mb-2">Imię i nazwisko</label>
              <input
                type="text"
                id="name"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#003E3C]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Afterparty */}
            <div>
              <label className="block text-lg font-serif mb-2">Czy korzystasz z noclegu?</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="afterparty"
                    value="tak"
                    checked={formData.afterparty === "tak"}
                    onChange={(e) => setFormData({ ...formData, afterparty: e.target.value })}
                  />
                  <span>Tak</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="afterparty"
                    value="nie"
                    checked={formData.afterparty === "nie"}
                    onChange={(e) => setFormData({ ...formData, afterparty: e.target.value })}
                  />
                  <span>Nie</span>
                </label>
              </div>
            </div>

            {/* Dieta */}
            <div className="relative">
              <label htmlFor="diet" className="block text-lg font-serif mb-2">Preferencje żywieniowe</label>
              <select
                id="diet"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#003E3C] appearance-none pr-10"
                value={formData.diet}
                onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
              >
                <option value="standard">Standard</option>
                <option value="wege">Wegetariańskie</option>
              </select>
              <ChevronDownIcon className="h-5 w-5 absolute right-3 top-[70%] transform -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>

            {/* Liczba gości */}
            <div className="relative">
              <label htmlFor="guests" className="block text-lg font-serif mb-2">Liczba gości</label>
              <select
                id="guests"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#003E3C] appearance-none pr-10"
                value={formData.guests}
                onChange={handleGuestsChange}
              >
                <option value="1">1 osoba</option>
                <option value="2">2 osoby</option>
                <option value="3">3 osoby</option>
                <option value="4">4 osoby</option>
                <option value="5">5 osób</option>
                <option value="6">6 osób</option>
              </select>
              <ChevronDownIcon className="h-5 w-5 absolute right-3 top-[70%] transform -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>

            {/* Dodatkowi goście */}
            {additionalGuests.length > 0 && (
              <div className="space-y-4 p-6 bg-white/80 rounded-lg">
                <h3 className="font-serif text-xl">Dodatkowi goście</h3>
                {additionalGuests.map((guest, index) => (
                  <div key={index} className="space-y-2">
                    <div>
                      <label className="block text-lg font-serif mb-2">Imię i nazwisko</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#003E3C]"
                        value={guest.name}
                        onChange={(e) => handleAdditionalGuestChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-lg font-serif mb-2">Preferencje żywieniowe</label>
                      <select
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#003E3C] appearance-none pr-10"
                        value={guest.diet}
                        onChange={(e) => handleAdditionalGuestChange(index, 'diet', e.target.value)}
                      >
                        <option value="standard">Standard</option>
                        <option value="wege">Wegetariańskie</option>
                      </select>
                      <ChevronDownIcon className="h-5 w-5 absolute right-3 top-[70%] transform -translate-y-1/2 pointer-events-none text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wiadomość */}
            <div>
              <label htmlFor="message" className="block text-lg font-serif mb-2">Wiadomość (opcjonalnie)</label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#003E3C]"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-lg font-serif text-lg flex items-center justify-center transition-colors 
              ${loading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white"}`}
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {loading ? "Wysyłanie..." : "Wyślij potwierdzenie"}
          </button>
        </form>
      </div>
    </section>
  );
}
