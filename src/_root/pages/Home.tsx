import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import UserSlider from "@/components/shared/UserSlider";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
//import { useUserContext } from "@/context/AuthContext";

const Home = () => {
    const {data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPosts();
    const {data: creators, isLoading: isUserLoading, isError: isErrorCreators} = useGetUsers();

    //  const { user } = useUserContext();

    if (isErrorPosts || isErrorCreators) {
      return (
        <div className="flex flex-1">
          <div className="home-container">
            <p className="body-medium text-light-1">Something bad happened</p>
          </div>
          <div className="home-creators">
            <p className="body-medium text-light-1">Something bad happened</p>
          </div>
        </div>
      );
    }

    const initialTopCreators = creators?.documents.filter((creator) => creator.posts?.length >= 2) || [];

    initialTopCreators?.sort((a, b) => b.posts.length - a.posts.length);

    let topCreators = initialTopCreators?.slice(0, 10);
    let minPostsRequired = topCreators?.length > 0 ? topCreators[topCreators?.length - 1].posts.length : 2;

    while (topCreators?.length < 10 && minPostsRequired > 0) {
        minPostsRequired--;
        topCreators = initialTopCreators?.filter((creator) => creator.posts.length >= minPostsRequired).slice(0, 10);
    }

    return (
      <div className="flex flex-1">
        <div className="home-container relative top-0">
          {isUserLoading && topCreators.length === 0 ? (
            <Loader />
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: false,
                slidesToScroll: 1,
              }}
              className="max-w-[240px] xs:max-w-[360px] sm:max-w-[500px] md:max-w-[430px] lg:max-w-screen-sm m-auto"
            >
              <CarouselContent className="-ml-1">
                {topCreators?.map((creator) => (
                  <CarouselItem
                    key={creator?.$id}
                    className="xs:basis-1/4 sm:basis-1/5 md:basis-1/4 lg:basis-1/6"
                  >
                    <UserSlider user={creator} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full mb-32 md:mb-0">
                {posts?.documents.map((post: Models.Document) => (
                  <PostCard post={post} key={post.caption} />
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="home-creators">
          <h3 className="h3-bold text-light-1">Top Creators</h3>
          {isUserLoading && topCreators.length === 0 ? (
            <Loader />
          ) : (
            <ul className="grid 2xl:grid-cols-2 gap-6">
              {topCreators?.map((creator) => (
                <li key={creator?.$id}>
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
}

export default Home;