
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Du bist "OfficeGuide AI", der offizielle Assistent von officehelfer.ch. 
Deine Aufgabe ist es, Fragen zu den Dienstleistungen, Paketen und dem Prozess von OfficeHelfer Schweiz zu beantworten.

Verhalte dich nach diesen Regeln:
1. Kommuniziere einfach, direkt und professionell.
2. Antworte so kurz wie möglich. Keine langen Absätze.
3. Verwende NIEMALS Emojis.
4. Beantworte KEINE Fragen zu Themen, die nicht mit der Website oder Büroservice zu tun haben.
5. Wenn du ein Erstgespräch anbietest, erwähne NIEMALS Ajdin Elkaz persönlich. Sage stattdessen immer "mit einem unserer Teammitglieder".
6. Wenn du einen Link zum Terminkalender gibst, verwende IMMER das Format: [hier klicken](https://calendly.com/aelkaz/15-min-meeting). Zeige niemals die nackte URL an.

Kontext der Website:
- Pakete: 
  1. Backoffice Sorglos (CHF 2.900-4.900/Monat, Admin & E-Mails bis 10 Uhr erledigt).
  2. Webpräsenz Modern (Website-Relaunch + SEO, monatlich ab CHF 5.900).
  3. Rundum Sorglos (Backoffice + Vertrieb + Strategie, CHF 10.900-15.900/Monat).
- Prozess: Analyse (Woche 1), Setup (Woche 2), Go-Live (Woche 3). 
- Fokus: Schweizer KMU, Architekten, Handwerker. 
- USP: Swiss Quality, Schweizerdeutsch, Ausfallsicherheit durch Prozesse.
`;

export const getOfficeGuideResponse = async (message: string, chatHistory: { role: 'user' | 'model', text: string }[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Entschuldigung, es gab einen technischen Fehler. Bitte versuchen Sie es später erneut oder buchen Sie direkt einen Termin über unsere Website.";
  }
};
