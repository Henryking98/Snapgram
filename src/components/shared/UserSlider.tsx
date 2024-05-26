import { UserCardProps } from "@/types";
import { Link } from "react-router-dom";

const UserSlider = ({ user }: UserCardProps) => {
  return (
      <div className="flex justify-start select-none relative top-0">
        <Link to={`/profile/${user.$id}`} className="user-slider">
          <div className="bg-gradient-to-r from-[#3121FF] via-[#877EFF] to-[#685DFF] p-1 w-16 h-16 sm:w-20 sm:h-20 rounded-full">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="rounded-full w-full h-full"
            />
          </div>

          <div className="flex-center flex-col gap-1">
            <p className="slider-text">{user.name}</p>
          </div>
        </Link>
      </div>
  );
};

export default UserSlider;
