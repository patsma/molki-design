<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero ctaLink="/buttons">
        <template #heroImage>
          <ParallaxImg>
            <nuxt-img
              src="/heroHome.jpg"
              alt="Nice Apartment"
              class="parallax-content"
              format="webp"
            />
          </ParallaxImg>
        </template>
        <template #title>Umów spotkanie</template>
        <template #subtitle>Z projektantką</template>
        <template #cta>Umów konsultację</template>
      </Hero>

      <HeroTeam>
        <template #title>POZNAJ ZESPÓŁ MOLKI DESIGN!</template>
        <template #image>
          <ParallaxImg>
            <nuxt-img
              src="/heroAbout.jpg"
              alt="Full width parallax"
              class="parallax-content"
              format="webp"
            />
          </ParallaxImg>
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
          <ParallaxImg>
            <nuxt-img
              src="/heroHome.jpg"
              alt="Wioletta Retko - Prezes Zarządu"
              class="parallax-content"
              format="webp"
            />
          </ParallaxImg>
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

      <HeroInterior ctaLink="/buttons">
        <template #heroImage>
          <ParallaxImg>
            <nuxt-img
              src="/heroInterior.jpg"
              alt="Interior design showcase"
              class="parallax-content"
              format="webp"
            />
          </ParallaxImg>
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

      <TitleSection :hasBackground="true">
        <template #title>Bezstresowy Remont od A do Z</template>
        <template #subtitle>
          Odkryj pakiety remontowe dostosowane do Twoich potrzeb i stylu życia
        </template>
      </TitleSection>

      <ItemCard ctaLink="/buttons">
        <template #image>
          <ParallaxImg>
            <nuxt-img src="/heroHome.jpg" alt="Card Image" class="parallax-content" format="webp" />
          </ParallaxImg>
        </template>
        <template #title>Lorem ipsum dolor sit amet</template>
        <template #content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </template>
        <template #cta>Discover More →</template>
      </ItemCard>

      <HeroBusiness ctaLink="/buttons">
        <template #heroImage>
          <ParallaxImg>
            <nuxt-img
              src="/heroInterior.jpg"
              alt="Interior design showcase"
              class="parallax-content"
              format="webp"
            />
          </ParallaxImg>
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
      </HeroBusiness>

      <!-- Hero Projects Section -->
      <HeroProjects ctaLink="/buttons">
        <template #heroImage>
          <ParallaxImg>
            <nuxt-img
              src="/heroAbout.jpg"
              alt="Our projects showcase"
              class="parallax-content"
              format="webp"
            />
          </ParallaxImg>
        </template>
        <template #cta>ZOBACZ WIĘCEJ</template>
        <template #title>Od projektu do realizacji - czyli Remont pod Klucz</template>
        <template #subtitle>Wybierz wariant dopasowany do Twoich potrzeb</template>
        <template #features>
          <IconGridItem>
            <template #icon>
              <Icon name="uil:hard-hat" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>PROFESJONALNE EKIPY REMONTOWE</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:users-alt" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>OPIEKA KOORDYNATORA REMONTU</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:money-stack" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>REALIZACJA ZGODNA Z BUDŻETEM</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:wallet" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>TRANSPARENTNE I RZETELNE WYCENY</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:percentage" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>NIŻSZY PODATEK - TYLKO 8% VAT</template>
          </IconGridItem>

          <IconGridItem>
            <template #icon>
              <Icon name="uil:head-side" class="w-16 h-16 text-primary mx-auto mb-4" />
            </template>
            <template #text>MY PRACUJEMY, TY ODPOCZYWASZ</template>
          </IconGridItem>
        </template>
      </HeroProjects>

      <ProjectGrid ctaLink="/buttons">
        <template #title>Od Koncepcji do Realizacji</template>
        <template #subtitle
          >Funkcjonalne i wykonawcze projekty, które zamieniają wizje w rzeczywistość</template
        >

        <template #projects>
          <ProjectGridItem to="/buttons">
            <template #image>
              <ParallaxImg>
                <nuxt-img
                  src="/heroHome.jpg"
                  alt="Projekt Funkcjonalny"
                  class="parallax-content transition-transform duration-300 group-hover:scale-110"
                  format="webp"
                />
              </ParallaxImg>
            </template>
            <template #title>Projekt Funkcjonalny</template>
            <template #description>
              to dokładny plan, który przygotujemy dla Ciebie, aby Twoja przestrzeń była wygodna i
              praktyczna, uwzględniając ergonomię oraz Twoje potrzeby.
            </template>
          </ProjectGridItem>

          <ProjectGridItem to="/buttons">
            <template #image>
              <ParallaxImg>
                <nuxt-img
                  src="/heroHome.jpg"
                  alt="Projekt Wykonawczy"
                  class="parallax-content transition-transform duration-300 group-hover:scale-110"
                  format="webp"
                />
              </ParallaxImg>
            </template>
            <template #title>Projekt Wykonawczy</template>
            <template #description>
              dostarczy Ci szczegółowe rysunki techniczne i specyfikacje materiałowe, które
              umożliwią realizację wnętrza zgodnie z ustalonymi założeniami i standardami jakości.
            </template>
          </ProjectGridItem>

          <ProjectGridItem to="/buttons">
            <template #image>
              <ParallaxImg>
                <nuxt-img
                  src="/heroHome.jpg"
                  alt="Porada Projektowa"
                  class="parallax-content transition-transform duration-300 group-hover:scale-110"
                  format="webp"
                />
              </ParallaxImg>
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
      <ServicesTable>
        <template #services>
          <ServiceTableRow
            name="Inwentaryzacja"
            :basicFunc="true"
            :premiumFunc="true"
            :basicExec="true"
            :premiumExec="true"
          />
          <ServiceTableRow
            name="Wyburzenia/zabudowy ścian"
            :basicFunc="true"
            :premiumFunc="true"
            :basicExec="true"
            :premiumExec="true"
          />
          <ServiceTableRow
            name="Układ funkcjonalny z opisami"
            :basicFunc="true"
            :premiumFunc="true"
            :basicExec="true"
            :premiumExec="true"
          />
          <ServiceTableRow
            name="Lista zakupów (materiałów, mebli, dodatków)"
            :basicFunc="true"
            :premiumFunc="false"
            :basicExec="true"
            :premiumExec="true"
          />
        </template>
      </ServicesTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
import HeroInterior from '~/components/HeroInterior.vue';
import HeroTeam from '~/components/HeroTeam.vue';
import HeroProjects from '~/components/HeroProjects.vue';
import TeamMember from '~/components/TeamMember.vue';
import Achievement from '~/components/Achievement.vue';
import ProjectGrid from '~/components/ProjectGrid.vue';
import ProjectGridItem from '~/components/ProjectGridItem.vue';
import IconGrid from '~/components/IconGrid.vue';
import IconGridItem from '~/components/IconGridItem.vue';
import HeroBusiness from '~/components/HeroBusiness.vue';
import ItemCard from '~/components/ItemCard.vue';
import TitleSection from '~/components/TitleSection.vue';
</script>
