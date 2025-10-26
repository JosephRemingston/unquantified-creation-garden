import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-flow flex items-center justify-center p-6">
      <div className="max-w-3xl text-center animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-full bg-primary/10">
            <Leaf className="w-16 h-16 text-primary animate-float" />
          </div>
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6">
          Flowstate
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
          Create without counting
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          A sanctuary where you reconnect with the joy of creation. 
          No metrics. No streaks. No performance pressure. 
          Just you, your thoughts, and a living garden that grows with presence, not progress.
        </p>

        {/* CTA */}
        <Button
          onClick={() => navigate("/mood")}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-full gentle-transition hover:scale-105"
        >
          Begin your journey
        </Button>

        {/* Philosophy */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">🌸 Express freely</h3>
              <p className="text-muted-foreground">
                Start with how you feel, not what you should accomplish
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">⏳ Flow gently</h3>
              <p className="text-muted-foreground">
                A timer without numbers, honoring presence over productivity
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">🌿 Grow organically</h3>
              <p className="text-muted-foreground">
                Watch your inner world blossom in a living garden
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
