import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div >
      <h1>Hello</h1>
      <Button>Click</Button>
      <UserButton></UserButton>
      
    </div>
  );
}
