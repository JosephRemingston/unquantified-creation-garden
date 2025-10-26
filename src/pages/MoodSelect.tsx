import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sparkles, Wind, Lightbulb, Waves, Heart, Star } from "lucide-react";

const moods = [
  { id: "calm", label: "Calm", icon: Waves, color: "primary" },
  { id: "curious", label: "Curious", icon: Lightbulb, color: "accent" },
  { id: "inspired", label: "Inspired", icon: Sparkles, color: "secondary" },
  { id: "restless", label: "Restless", icon: Wind, color: "primary" },
  { id: "creative", label: "Creative", icon: Star, color: "accent" },
  { id: "grateful", label: "Grateful", icon: Heart, color: "secondary" },
];

const MoodSelect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setTimeout(() => {
      navigate("/flow", { state: { mood: moodId } });
    }, 400);
  };

  return (
    <div className="min-h-screen gradient-flow flex items-center justify-center p-6">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">
            How are you feeling?
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose what resonates with you right now
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {moods.map((mood, index) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.id;
            
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`
                  group relative p-8 rounded-3xl border-2 
                  transition-all duration-500 
                  ${isSelected 
                    ? "bg-card border-primary shadow-lg scale-105" 
                    : "bg-card/50 border-border hover:border-primary/50 hover:shadow-md hover:scale-102"
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`
                    p-4 rounded-full transition-all duration-500
                    ${isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10"
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-medium">{mood.label}</span>
                </div>
                
                {isSelected && (
                  <div className="absolute inset-0 rounded-3xl animate-gentle-pulse bg-primary/5" />
                )}
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to sanctuary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelect;
