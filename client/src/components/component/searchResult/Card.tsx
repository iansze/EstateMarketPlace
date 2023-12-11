import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

type cardProps = {
  id?: string;
  image: string;
  title: string;
  address: string;
  description: string;
  beds: number;
  baths: number;
  price: number;
  sellingPrice: number;
  discountedPrice: number;
};

const Card = ({
  id,
  image,
  title,
  address,
  description,
  beds,
  baths,
  price,
  sellingPrice,
  discountedPrice,
}: cardProps) => {
  return (
    <div className=" flex min-w-[350px]  flex-col overflow-hidden rounded-xl border-2 shadow-md  lg:max-w-[350px] ">
      <Link to={`/listing/${id}`}>
        <img
          src={image}
          alt={image}
          className="transition-scale h-[320px]  w-full object-cover duration-300 hover:scale-110"
        />
        <div className="flex w-full flex-col gap-2 p-3 text-base">
          <h1 className="h-[60px] text-xl font-semibold">{title}</h1>
          <p className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt />
            {address}
          </p>
          <p className="line-clamp-2 min-h-[50px] break-words">{description}</p>
          <div className="flex gap-4">
            {(discountedPrice || price) && (
              <p className="">
                {discountedPrice
                  ? `Rent: $${discountedPrice.toLocaleString("en-us")} / month`
                  : `Rent: $${price.toLocaleString("en-us")} / month`}
              </p>
            )}
            <p className="">
              {sellingPrice &&
                `Price: $${sellingPrice.toLocaleString("en-us")}`}
            </p>
          </div>
          <div className="flex gap-4">
            <p className="">
              {beds} <span>bed</span>
            </p>
            <p className="">
              {baths} <span>bath</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
