const Home = ({ name }) => {
  return (
    <div className="text-4xl text-white font-bold font-serif flex justify-center items-center h-[90vh] ">
      Welcome{name ? ", " + name : ""}
    </div>
  );
};

export default Home;
