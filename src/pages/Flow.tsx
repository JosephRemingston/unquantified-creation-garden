import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Flow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const mood = location.state?.mood || "calm";
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const prompts: Record<string, string> = {
    calm: "Write about a moment today that brought you peace...",
    curious: "What questions are living in your mind right now?",
    inspired: "Describe something that sparked your imagination...",
    restless: "Let your thoughts flow without direction or judgment...",
    creative: "Create something with words, without rules or limits...",
    grateful: "What made you smile today, however small?",
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleComplete = async () => {
    if (!user || !content.trim()) return;
    
    setIsSaving(true);
    try {
      // Save the flow session to database
      const { data: session, error: sessionError } = await supabase
        .from("flow_sessions")
        .insert({
          user_id: user.id,
          mood,
          content: content.trim()
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      // Create garden elements for this session
      const elementTypes = ["flower", "leaf", "sparkle"];
      const randomElement = elementTypes[Math.floor(Math.random() * elementTypes.length)];
      
      const { error: gardenError } = await supabase
        .from("garden_elements")
        .insert({
          user_id: user.id,
          session_id: session.id,
          element_type: randomElement,
          position_x: Math.random(),
          position_y: Math.random()
        });

      if (gardenError) throw gardenError;

      navigate("/garden", { state: { mood, content, sessionId: session.id } });
    } catch (error: any) {
      toast.error("Could not save your reflection. Please try again.");
      console.error("Error saving session:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen gradient-meadow flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Flow Indicator */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary animate-gentle-pulse" />
            </div>
            <p className="text-center mt-4 text-sm text-muted-foreground">
              You are in the moment
            </p>
          </div>
        </div>

        {/* Creation Space */}
        <div className="bg-card rounded-3xl shadow-xl p-8 animate-fade-in">
          {showPrompt && (
            <p className="text-lg text-muted-foreground mb-6 font-serif italic text-center">
              {prompts[mood]}
            </p>
          )}
          
          <Textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (e.target.value && showPrompt) setShowPrompt(false);
            }}
            placeholder="Begin typing..."
            className="min-h-[300px] text-lg border-none resize-none focus-visible:ring-0 bg-transparent"
            autoFocus
          />

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/mood")}
              className="text-muted-foreground"
            >
              Start over
            </Button>
            
            <Button
              onClick={handleComplete}
              disabled={!content.trim() || isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              {isSaving ? "Saving..." : "Complete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flow;
