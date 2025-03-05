---
title: 'Test plików cookie'
description: 'Strona testowa do weryfikacji działania mechanizmu plików cookie'
---

# Test plików cookie

Ta strona służy do testowania mechanizmu zarządzania plikami cookie.

::CookieTest
::

## Jak działa mechanizm plików cookie?

1. Banner cookie pojawia się na dole strony przy pierwszej wizycie
2. Użytkownik może zaakceptować wszystkie pliki cookie, tylko niezbędne lub przejść do zarządzania ustawieniami
3. W panelu zarządzania, użytkownik może wybrać, które rodzaje plików cookie chce zaakceptować
4. Po dokonaniu wyboru, preferencje użytkownika są zapamiętywane w przeglądarce

## Jak testować banner cookie?

1. **Zresetuj cookie** - Aby zobaczyć banner ponownie, należy usunąć pliki cookie z przeglądarki. W Chrome należy:
   - Otworzyć DevTools (F12)
   - Przejść do zakładki "Application"
   - Rozwinąć "Cookies" w sekcji Storage
   - Kliknąć na domenę strony
   - Usunąć cookie "cookie_control_consent" i "cookie_control_enabled_cookies"
   - Odświeżyć stronę

2. **Panel testowy** - Panel testowy powyżej pokazuje aktualny stan zaakceptowanych cookie.
   - Jeśli panel nie działa, sprawdź konsolę przeglądarki, która powinna pokazywać logi związane z cookie

3. **Konsola przeglądarki** - W konsoli przeglądarki powinny pojawiać się logi, gdy cookie są akceptowane lub odrzucane.

## Jakie pliki cookie wykorzystujemy?

- **Niezbędne pliki cookie** - wymagane do prawidłowego działania strony
- **Funkcjonalne pliki cookie** - poprawiają wygodę korzystania z witryny

Obecnie nie używamy plików cookie analitycznych ani marketingowych, ale mogą one zostać dodane w przyszłości. 