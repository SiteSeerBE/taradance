import HomeArticle from "./HomeArticle";

const HomeArticles: React.FC = () => {
  return (
    <>
      <HomeArticle
        buttons={[
          { label: "Meer weten", href: "#" },
          { label: "Inschrijven", href: "#" },
        ]}
        content="Ontdek de wereld van Ierse dans! Ierse dans is voor iedereen, van
            vijf jaar en ouder. Geen eerdere ervaring is nodig, hoewel het een
            pluspunt kan zijn. We bereiden je voor om een volwaardige Ierse
            danser of danseres te worden, met aandacht voor je gezondheid en
            welzijn. De lessen vinden plaats op zaterdagvoormiddag van 9.00u tot
            14.00u, waar je nieuwe steps leert, en op dinsdagavond van 19.00u
            tot 21.00u voor herhaling en repetities van optredens. Onze
            danslessen zijn in het centrum van Kapelle-op-den-Bos, makkelijk
            bereikbaar met openbaar vervoer of de auto. Onze goed uitgeruste
            danszaal beschikt over houten vloeren en spiegels. Wat betreft de
            kosten: het eerste jaar kost slechts €120 voor lessen en
            verzekering, het tweede jaar is €80 voor hard shoe-lessen en €30
            voor ceililessen. Daarnaast bieden we een gezinskorting van €10 voor
            elk volgend kind dat zich inschrijft. Schrijf je vandaag nog in en
            stap in de wereld van Ierse dans!"
        image="https://ik.imagekit.io/taradance/UI/home-hero.webp"
        title="Dansen bij Taradance!"
      />
    </>
  );
};

export default HomeArticles;
