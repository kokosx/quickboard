// import { Button } from "@/components/ui/button";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Star } from "lucide-react";
// import WhoToFollow from "./WhoToFollow";
// import LayoutAside from "./LayoutAside";
// import TrendsForYou from "./TrendsForYou";
// import Post from "./Post";
// import LayoutTopBar from "./LayoutTopBar";
// import CreatePost from "./CreatePost";

// export default function TwitterLayout() {
//   return (
//     <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
//       <LayoutTopBar />
//       <div className="container mx-auto flex-1 items-start px-4 py-4 md:grid md:grid-cols-[1fr_2fr_1fr] md:gap-6 md:px-6 lg:grid-cols-[3fr_1fr]">
//         <main className="flex flex-col gap-4">
//           <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
//             <h1 className="text-xl font-bold">Home</h1>
//             <Button variant="ghost" size="icon" className="rounded-full">
//               <Star className="h-5 w-5" />
//               <span className="sr-only">Top Posts</span>
//             </Button>
//           </div>
//           <CreatePost />
//           <ScrollArea className="h-[calc(100vh-12rem)]">
//             <div className="grid gap-4">
//               <Post
//                 avatar="/placeholder.svg?height=40&width=40"
//                 name="Jane Cooper"
//                 username="@janecooper"
//                 time="2h"
//                 content="Just had an amazing coffee at this new place downtown! ☕️ Highly recommend checking it out if you're in the area. The ambiance is perfect for working remotely too. #CoffeeLovers"
//                 likes={24}
//                 retweets={5}
//                 replies={3}
//               />
//               <Post
//                 avatar="/placeholder.svg?height=40&width=40"
//                 name="Alex Johnson"
//                 username="@alexjohnson"
//                 time="4h"
//                 content="Excited to announce that I'll be speaking at the upcoming tech conference next month! Looking forward to sharing insights on the latest web development trends. #WebDev #TechConference"
//                 likes={142}
//                 retweets={38}
//                 replies={12}
//               />
//               <Post
//                 avatar="/placeholder.svg?height=40&width=40"
//                 name="Sarah Williams"
//                 username="@sarahwilliams"
//                 time="6h"
//                 content="Just finished reading this amazing book on artificial intelligence. It's mind-blowing how far we've come in this field! Anyone else interested in AI and machine learning? Let's connect and discuss! #AI #MachineLearning #BookRecommendation"
//                 likes={87}
//                 retweets={14}
//                 replies={9}
//               />
//               <Post
//                 avatar="/placeholder.svg?height=40&width=40"
//                 name="Michael Brown"
//                 username="@michaelbrown"
//                 time="8h"
//                 content="Beautiful sunset view from my balcony today. Sometimes you need to pause and appreciate these little moments. Nature's art is truly spectacular! 🌅 #Sunset #NatureLovers"
//                 likes={215}
//                 retweets={42}
//                 replies={18}
//               />
//               <Post
//                 avatar="/placeholder.svg?height=40&width=40"
//                 name="Emily Davis"
//                 username="@emilydavis"
//                 time="10h"
//                 content="Just completed my first half marathon! 🏃‍♀️ Months of training finally paid off. Feeling exhausted but incredibly proud. Thanks to everyone who supported me along the way! #Running #HalfMarathon #PersonalAchievement"
//                 likes={328}
//                 retweets={56}
//                 replies={41}
//               />
//             </div>
//           </ScrollArea>
//         </main>
//         <LayoutAside>
//           <WhoToFollow />
//           <TrendsForYou />
//         </LayoutAside>
//       </div>
//     </div>
//   );
// }
