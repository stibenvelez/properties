import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionSteps from "components/SectionOurFeatures/SectionSteps";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { Helmet } from "react-helmet";

const DEMO_CATS: TaxonomyType[] = [
    {
        id: "1",
        href: "/#",
        name: "Medellin",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://cdn.pixabay.com/photo/2017/09/06/19/35/colombia-2722716_960_720.jpg",
    },
    {
        id: "2",
        href: "/#",
        name: "Bogotá",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://cdn.pixabay.com/photo/2019/09/07/02/25/city-4457801__480.jpg",
    },
    {
        id: "2",
        href: "/#",
        name: "Itagui",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://www.eje21.com.co/site/wp-content/uploads/2020/02/itagui-se-transforma-por-la-construccion.jpg",
    },
    {
        id: "2",
        href: "/#",
        name: "Envigado",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://telemedellin.tv/wp-content/uploads/2020/02/Envigado.jpg",
    },
    {
        id: "2",
        href: "/#",
        name: "Rionegro",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://i1.wp.com/orienteantioqueno.com/wp-content/uploads/2020/11/plaza-de-la-libertad-rionegro-oriente-antioque%C3%B1o.jpg?fit=900%2C460&ssl=1",
    },
    {
        id: "2",
        href: "#",
        name: "La Estrella",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://www.bienesonline.com/colombia/photos/venta-hermosa-casa-en-toledo-casasn-la-estrella-14817346181.jpg",
    },
];

function PageHome() {
  return (
      <div className="relative overflow-hidden nc-PageHome">
          <Helmet>
              <title>Inmuebles App</title>
          </Helmet>
          {/* GLASSMOPHIN */}
          <BgGlassmorphism />

          <div className="container relative mb-24 space-y-24 lg:space-y-32 lg:mb-32">
              {/* SECTION HERO */}
              <SectionHero className="pt-10 pb-16 lg:pt-20" />

              {/* SECTION 1 */}
              <SectionSliderNewCategories
                  categories={DEMO_CATS}
                  uniqueClassName="PageHome_s1"
              />

              {/* SECTION2 */}
              <SectionSteps />

              {/* SECTION */}
              {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces />
        </div> */}

              {/* SECTION */}
              <SectionHowItWork />

              {/* SECTION 1 */}
              {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading=""
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div> */}

              {/* SECTION */}
              <SectionSubscribe2 />

              {/* SECTION */}

              {/* SECTION */}
              {/* <SectionGridCategoryBox /> */}

              {/* SECTION */}
              {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}

              {/* SECTION */}
              <SectionVideos />

              {/* SECTION */}
              <div className="relative py-16">
                  <BackgroundSection />
                  <SectionClientSay uniqueClassName="PageHome_" />
              </div>
          </div>
      </div>
  );
}

export default PageHome;
