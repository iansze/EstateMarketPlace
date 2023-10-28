import { ListingPost } from "../../types/Types";
import Card from "./Card";

type searchResultProps = {
  data: ListingPost[];
};

const SearchResult = ({ data }: searchResultProps) => {
  return (
    <div className="flex flex-col flex-wrap items-center gap-4 md:gap-8 lg:flex-row ">
      {data.map((item) => (
        <Card
          key={item._id}
          id={item._id}
          image={item.images[0]}
          address={item.address}
          title={item.listName}
          description={item.description}
          beds={item.beds}
          baths={item.baths}
          price={item.price}
          sellingPrice={item.sellingPrice}
          discountedPrice={item.discountedPrice}
        />
      ))}
    </div>
  );
};

export default SearchResult;
