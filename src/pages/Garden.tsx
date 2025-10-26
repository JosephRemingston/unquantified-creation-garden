import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Flower2, Leaf, Sparkles } from "lucide-react";

const reflectionPrompts = [
  "What did you feel during this?",
  "What surprised you about today?",
  "What would you like to carry forward?",
  "What did this moment teach you?",
  "How does your heart feel now?",
];

const Garden = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const mood = location.state?.mood;
  const [prompt] = useState(() => 
    reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)]
  );
  const [flowers, setFlowers] = useState<number[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Load user's total sessions count
    const loadSessionCount = async () => {
      const { count } = await supabase
        .from("flow_sessions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      
      setTotalSessions(count || 0);
    };

    loadSessionCount();

    // Animate flowers growing
    const timer = setTimeout(() => {
      setFlowers([1, 2, 3]);
    }, 300);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen gradient-calm flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Garden Visualization */}
        <div className="mb-12">
          <div className="relative h-64 flex items-end justify-center gap-8">
            {flowers.map((flower, index) => (
              <div
                key={flower}
                className="animate-grow"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {index === 1 ? (
                  <Flower2 className="w-16 h-16 text-primary animate-float" />
                ) : index === 0 ? (
                  <Leaf className="w-12 h-12 text-secondary animate-float" style={{ animationDelay: "1s" }} />
                ) : (
                  <Sparkles className="w-10 h-10 text-accent animate-float" style={{ animationDelay: "2s" }} />
                )}
              </div>
            ))}
          </div>
          <p className="text-2xl font-serif text-foreground mt-8 animate-fade-in">
            Your garden grows
          </p>
          <p className="text-muted-foreground mt-2">
            {totalSessions > 1 
              ? `${totalSessions} moments of presence` 
              : "Not by counting, but by being"}
          </p>
        </div>

        {/* Reflection Prompt */}
        <div className="bg-card rounded-3xl p-8 shadow-lg mb-8 animate-fade-in">
          <p className="text-lg text-muted-foreground italic mb-2">Gentle reflection:</p>
          <p className="text-xl font-serif text-foreground">{prompt}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate("/mood")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Create again
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-border hover:bg-muted"
          >
            Return to sanctuary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Garden;
