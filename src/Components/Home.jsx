import Footer from "./Footer";
import Header from "./Header";
import PropertyList from "./PropertyList";
import PropertySearch from "./PropertySearch";
import TextCards from "./TextCards";

function Home() {
  return (
    <section>
      <div className="" id="home">
        <PropertySearch />
      </div>
      <div>
        <PropertyList />
      </div>
      <TextCards />
      <Footer />
    </section>
  );
}

export default Home;
