interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="relative group">
      {/* Effet de brillance */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-purple-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
      
      {/* Contenu principal */}
      <div className="relative p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-4 font-display">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed font-light text-lg">
          {description}
        </p>
      </div>
    </div>
  );
} 