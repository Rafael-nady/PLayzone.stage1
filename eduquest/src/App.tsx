import { useState, useCallback, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Game from "@/pages/Game";
import NotFound from "@/pages/not-found";
import UnitySplash from "@/components/UnitySplash";
import Welcome from "@/pages/Welcome";
import Home from "@/pages/Home";
import VocabGame from "@/pages/VocabGame";
import SentenceGame from "@/pages/SentenceGame";
import PronounceGame from "@/pages/PronounceGame";
import StoryGame from "@/pages/StoryGame";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

function Router() {
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (location === "/") {
      const name = localStorage.getItem("playerName");
      navigate(name ? "/home" : "/welcome", { replace: true });
    }
  }, [location, navigate]);

  return (
    <Switch>
      <Route path="/welcome"          component={Welcome} />
      <Route path="/home"             component={Home} />
      <Route path="/play/vocab"       component={VocabGame} />
      <Route path="/play/sentence"    component={SentenceGame} />
      <Route path="/play/pronounce"   component={PronounceGame} />
      <Route path="/play/story"       component={StoryGame} />
      <Route path="/play/platformer"  component={Game} />
      <Route path="/admin"            component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const hideSplash = useCallback(() => setShowSplash(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && <UnitySplash onDone={hideSplash} />}
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
