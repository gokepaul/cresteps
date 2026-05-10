import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import ReviewStrip from "@/components/home/ReviewStrip";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <BrandStory />
      <ReviewStrip />
      <InstagramFeed />
    </>
  );
}
