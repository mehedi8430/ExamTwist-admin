import { Wrench, Clock, Rocket, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function UnderWorking() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-full p-8 inline-block">
            <Wrench className="size-18 text-primary animate-bounce" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            We're Building Something Amazing
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            This feature is currently under development. Our team is working
            hard to bring you an exceptional experience.
          </p>
        </div>

        {/* Features Coming Soon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              We're putting the finishing touches on this feature
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <Rocket className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Worth the Wait</h3>
            <p className="text-sm text-muted-foreground">
              Something great is in the works just for you
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <Wrench className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">In Progress</h3>
            <p className="text-sm text-muted-foreground">
              Our developers are crafting this feature with care
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="pt-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Development Progress</span>
            <span className="text-primary font-medium">75%</span>
          </div>
          <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
              style={{ width: "75%" }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-muted-foreground pt-4">
          Have questions? Feel free to reach out to our support team.
        </p>
      </div>
    </section>
  );
}
