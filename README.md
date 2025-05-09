🛍️ Sklep Internetowy – Wersja V1
To pierwsza wersja aplikacji sklepu internetowego stworzonego w architekturze full-stack z wykorzystaniem React, Node.js, Express oraz MongoDB.

Projekt został podzielony na frontend i backend, a jego celem było stworzenie działającej podstawowej wersji sklepu internetowego z logowaniem, koszykiem, zamówieniami oraz panelem admina.

Obecnie pracuję nad kolejną, bardziej zoptymalizowaną wersją aplikacji z lepszą strukturą, Reduxem i wdrożeniem na własnym VPS-ie.
 
📁 Struktura katalogów
Kopiuj
Edytuj
ReactApps/
├── frontend/
└── backend/
📂 frontend/
Aplikacja kliencka zbudowana w React z wykorzystaniem Vite.

Zawartość:

src/components/ – pojedyncze komponenty interfejsu użytkownika, np. formularze, listy, przyciski

src/pages/ – widoki odpowiadające poszczególnym podstronom aplikacji (np. strona główna, koszyk, szczegóły produktu)

src/hooks/ – własne hooki React (np. do pobierania danych)

src/context/ – zarządzanie stanem globalnym (np. autoryzacja, koszyk)

App.jsx – główny komponent aplikacji z routingiem

main.jsx – punkt wejścia aplikacji

vite.config.js – konfiguracja Vite

📂 backend/
Aplikacja serwerowa stworzona z użyciem Node.js i Express. Udostępnia REST API do obsługi użytkowników, produktów i zamówień.

Zawartość:

controllers/ – logika odpowiadająca za przetwarzanie żądań (np. dodawanie produktów, logowanie użytkownika)

routes/ – trasy HTTP powiązane z kontrolerami (np. /api/products)

models/ – schematy Mongoose dla MongoDB (produkty, użytkownicy, zamówienia)

middleware/ – funkcje pośredniczące (np. ochrona tras, autoryzacja)

config/ – konfiguracja połączenia z bazą danych

utils/ – funkcje pomocnicze (np. generowanie tokenów JWT)

server.js – główny plik uruchamiający aplikację backendową

ℹ️ Status projektu
To była pierwsza wersja projektu, zrealizowana jako MVP (Minimum Viable Product) w celu nauki i stworzenia funkcjonalnego szkieletu aplikacji sklepu.

Aktualnie pracuję nad nową wersją, która będzie bardziej zoptymalizowana, z zastosowaniem Reduxa, lepszym podziałem logiki, wydajniejszą strukturą i wdrożeniem na własnym serwerze VPS.
