# Przykładowa strona z artykułami

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel nunc euismod tincidunt.

## Najnowsze artykuły

::blog-display
#title
Najnowsze artykuły

#subtitle
Sprawdź nasze najnowsze publikacje i porady
::

## Określona kategoria artykułów

::blog-grid{:limit="2" :category="'Projektowanie'"}
#title
Projektowanie wnętrz

#subtitle
Artykuły związane z projektowaniem wnętrz

#button
<NuxtLink to="/blog?category=Projektowanie" class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md transition-colors duration-300">
  Zobacz wszystkie artykuły o projektowaniu
</NuxtLink>
::

## Przykład użycia SquareGrid dla blogów

::square-grid{:contentType="'blog'" :orderBy="'date'" :orderDirection="'DESC'" :limit="2"}
#title
Ostatnie wpisy na blogu

#subtitle
Przeczytaj nasze najnowsze publikacje

#item
SquareGridItem o blogu
::

## Jak korzystać z nowych komponentów

Aby wyświetlić najnowsze artykuły z blogu, użyj:


::blog-display
#title
Tytuł sekcji

#subtitle
Podtytuł sekcji
::


Aby wyświetlić artykuły z określonej kategorii:


::blog-grid{:limit="2" :category="'Projektowanie'"}
#title
Tytuł sekcji

#subtitle
Podtytuł sekcji

#button
<NuxtLink to="/blog?category=Projektowanie" class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md transition-colors duration-300">
  Tekst przycisku
</NuxtLink>
::


Możesz również użyć komponentu `SquareGrid` do wyświetlania blogów:


::square-grid{:contentType="'blog'" :orderBy="'date'" :orderDirection="'DESC'" :limit="2"}
#title
Tytuł sekcji

#subtitle
Podtytuł sekcji
::
