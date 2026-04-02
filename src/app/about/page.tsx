import Team from "@/components/Team";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Cornerstone Engineering and Surveying',
  description: 'Learn more about the team of professionals at Cornerstone Engineering and Surveying.',
};

export default function About() {
  return <Team />;
}
