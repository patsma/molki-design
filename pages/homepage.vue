<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero>
        <template #heroImage>
          <ParallaxImg
            src="/heroHome.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #title> umów spotkanie </template>
        <template #subtitle> z projektantką </template>
        <template #cta> umów konsultację </template>
      </Hero>

      <HeroTeam>
        <template #title>POZNAJ ZESPÓŁ MOLKI DESIGN!</template>
        <template #image>
          <ParallaxImg
            src="/heroAbout.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #description>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Od 2019 roku Molki Design, z siedzibą w Gdańsku, działa na rynku trójmiejskim, oferując
            kreatywne rozwiązania, które przekraczają oczekiwania.
          </p>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Nasz zespół to grupa pasjonatów, którzy wzajemnie się uzupełniają, by dostarczać
            projekty, z których możemy być dumni.
          </p>
        </template>
      </HeroTeam>

      <TeamMember>
        <template #section-title>POZNAJMY SIĘ!</template>
        <template #name>Wioletta Retko</template>
        <template #role>Prezes Zarządu</template>
        <template #description>
          <p class="mb-6">
            Uwielbiam organizować i nadzorować złożone projekty. Codziennie dbam o to, by każdy etap
            realizacji przebiegał zgodnie z planem, a każdy detal był dopracowany do perfekcji.
          </p>
          <p>
            Nie tylko kocham kolory i estetykę, ale również dbam o funkcjonalność przestrzeni, by
            były one zarówno piękne, jak i praktyczne. To pozwala mi rozwijać zespół i osiągać
            lepsze rezultaty.
          </p>
        </template>
        <template #image>
          <ParallaxImg
            src="/heroHome.jpg"
            alt="Anna Kowalska"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #achievements>
          <Achievement>
            <template #title>150+</template>
            <template #subtitle>Zrealizowanych Projektów</template>
          </Achievement>
          <Achievement>
            <template #title>10 lat</template>
            <template #subtitle>Doświadczenia</template>
          </Achievement>
          <Achievement>
            <template #title>98%</template>
            <template #subtitle>Zadowolonych Klientów</template>
          </Achievement>
          <Achievement>
            <template #title>25+</template>
            <template #subtitle>Nagród Branżowych</template>
          </Achievement>
        </template>
      </TeamMember>
      <HeroInterior>
        <template #heroImage>
          <ParallaxImg
            src="/heroInterior.jpg"
            alt="Interior design showcase"
            class="h-full w-full object-cover"
            format="webp"
          />
        </template>
        <template #cta>ZOBACZ NASZE REALIZACJE</template>
        <template #title>PROJEKT WNĘTRZA</template>
        <template #content>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Projektowanie wnętrz w naszym wykonaniu to partnerska współpraca z każdym klientem
            oparta na komunikacji, szacunku i zaufaniu.
          </p>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Do każdego projektu podchodzimy z otwartym umysłem, dobrym poczuciem humoru i chęcią
            wysłuchania.
          </p>
          <p class="text-xl md:text-2xl leading-relaxed text-neutral-800">
            Rezultatem jest wspólna wizja przestrzeni, nad którą wspólnie pracujemy.
          </p>
        </template>
      </HeroInterior>
      <ProjectGrid ctaLink="/projects">
        <template #title>Od Koncepcji do Realizacji</template>
        <template #subtitle
          >Funkcjonalne i wykonawcze projekty, które zamieniają wizje w rzeczywistość</template
        >

        <template #projects>
          <ProjectGridItem to="/projects/functional">
            <template #image>
              <ParallaxImg
                src="/heroHome.jpg"
                alt="Projekt Funkcjonalny"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                format="webp"
              />
            </template>
            <template #title>Projekt Funkcjonalny</template>
            <template #description>
              to dokładny plan, który przygotujemy dla Ciebie, aby Twoja przestrzeń była wygodna i
              praktyczna, uwzględniając ergonomię oraz Twoje potrzeby.
            </template>
          </ProjectGridItem>

          <ProjectGridItem to="/projects/execution">
            <template #image>
              <ParallaxImg
                src="/heroHome.jpg"
                alt="Projekt Wykonawczy"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                format="webp"
              />
            </template>
            <template #title>Projekt Wykonawczy</template>
            <template #description>
              dostarczy Ci szczegółowe rysunki techniczne i specyfikacje materiałowe, które
              umożliwią realizację wnętrza zgodnie z ustalonymi założeniami i standardami jakości.
            </template>
          </ProjectGridItem>

          <ProjectGridItem to="/projects/consultation">
            <template #image>
              <ParallaxImg
                src="/heroHome.jpg"
                alt="Porada Projektowa"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                format="webp"
              />
            </template>
            <template #title>Porada Projektowa</template>
            <template #description>
              to spotkanie, podczas którego nasza projektantka wnętrz doradzi, jakie rozwiązania
              najlepiej pasują do Twojej przestrzeni i potrzeb.
            </template>
          </ProjectGridItem>
        </template>

        <template #cta>UMÓW KONSULTACJĘ</template>
      </ProjectGrid>

      <IconGrid>
        <template #title>Poznaj etapy Procesu Projektowania</template>
        <template #items>
          <IconGridItem>
            <template #icon>
              <Icon name="uil:users-alt" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>SPOTKANIE ZAPOZNAWCZE Z PROJEKTANTKĄ</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:ruler-combined" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>INWENTARYZACJA POMIESZCZEŃ</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:palette" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>DOBÓR INDYWIDUALNYCH ROZWIĄZAŃ</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:ruler-combined" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>RYSOWANIE PROJEKTU</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:ruler-combined" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>WYBÓR MEBLI I DODATKÓW</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:swatchbook" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>DOBÓR MATERIAŁÓW</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:image-check" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>PRZEDSTAWIENIE WIZUALIZACJI</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:file-check-alt" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>PRZEKAZANIE PROJEKTU Z OPISAMI I LISTĄ ZAKUPÓW</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:check-circle" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text
              >DECYZJA O REALIZACJI W OPARCIU O SZCZEGÓŁOWY KOSZTORYS REMONTU</template
            >
          </IconGridItem>
        </template>
      </IconGrid>

      <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
import HeroInterior from '~/components/HeroInterior.vue';
import HeroTeam from '~/components/HeroTeam.vue';
import TeamMember from '~/components/TeamMember.vue';
import Achievement from '~/components/Achievement.vue';
import ProjectGrid from '~/components/ProjectGrid.vue';
import ProjectGridItem from '~/components/ProjectGridItem.vue';
import IconGrid from '~/components/IconGrid.vue';
import IconGridItem from '~/components/IconGridItem.vue';
</script>
