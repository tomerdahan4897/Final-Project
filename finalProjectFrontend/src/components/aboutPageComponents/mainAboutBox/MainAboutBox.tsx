import css from "./MainAboutBox.module.scss";
const MainAboutBox = () => {
  return (
    <div>
      <div className={css.mainAboutBox}>
        <div className={`${css.titles}`}>
          <h2 className={css.firstTitle}>Our Products</h2>
          <h2 className={css.secondTitle}>Your Experience</h2>
        </div>
        <p className={css.mainContent}>
          It all started in 1970. We started our agricultural journey in Moshav
          Shaar Yishuv in the north of the country. In beautiful, spacious
          plantations, as only Israeli agriculture can look like. We started
          growing peaches, nectarines, plums and apples. And over the years, we
          started selling the product in the wholesale market. Even then we
          envisioned the dream store, one that has everything that was picked
          from the field this morning and is already on the shelf, shiny and
          shiny. A store that you walk into and feel as if you picked the
          produce yourself. Similar to the picking and packing process, the user
          experience in creating the order in the digital store is also
          uncomplicated. The list that the customer compiles is the same list
          that reaches the farmer according to desired types and quantities. The
          fast shipping is derived from the fact that the collection is done on
          a daily basis. As of today, the company's shipments are addressed to
          all parts of the country except Eilat. The deliveries are conditional
          on a minimum order of 100 NIS and the shipping cost is free on
          purchases over 300 NIS. And what awaits us in the future? The plan is
          to expand further. To continue to maintain the high level of service
          that we set our flag on, and after that - the sky is the limit. <br />
          <span
            style={{ fontWeight: "bold", fontSize: "1.8rem", color: "#fcd423" }}
          >
            We invite you to fall in love with GoNature's creation of nature.
          </span>
        </p>
      </div>
    </div>
  );
};

export default MainAboutBox;
