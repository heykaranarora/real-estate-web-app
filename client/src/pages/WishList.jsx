import "../styles/List.css";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList) || [];

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      {wishList.length === 0 ? (
        <div style={{height:'50vh'}}><h2 style={{textAlign:'center',color:'red'}}>No items in your wishlist. Add items to see them here.</h2></div>
      ) : (
        <div className="list">
          {wishList.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id} // Added a key prop for better rendering performance
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default WishList;
