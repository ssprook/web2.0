"use client";

import { SpamAnalysis } from "@/utils/spamWords";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SpamAnalysisProps {
  analysis: SpamAnalysis;
  mlResult: {
    prediction: string;
    probability: number;
    confidence: string;
    processing_time: string;
  } | null;
}

export function SpamAnalysisDisplay({ analysis, mlResult }: SpamAnalysisProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Résultat ML */}
      {mlResult && (
        <Card className="p-6 backdrop-blur-md bg-black/30 border border-white/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Spam Detection</h3>
              <span className={`text-lg font-bold ${
                mlResult.prediction.toLowerCase().includes("spam") ? "text-red-400" : "text-green-400"
              }`}>
                {mlResult.prediction}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Spam Score:</span>
                <span className="font-medium text-white">{(mlResult.probability * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Confidence:</span>
                <span className="font-medium text-white">{mlResult.confidence}</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Analyse des mots */}
      <Card className="p-6 backdrop-blur-md bg-black/30 border border-white/10">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Spam Words Analysis</h3>
          
          <div className="flex flex-wrap gap-2">
            {analysis.categories.urgency > 0 && (
              <Badge variant="outline" className="backdrop-blur-sm bg-orange-500/20 text-orange-200 border-orange-500/30">
                ⚠️ Urgency ({analysis.categories.urgency})
              </Badge>
            )}
            {analysis.categories.shady > 0 && (
              <Badge variant="outline" className="backdrop-blur-sm bg-purple-500/20 text-purple-200 border-purple-500/30">
                🔍 Shady ({analysis.categories.shady})
              </Badge>
            )}
            {analysis.categories.overpromise > 0 && (
              <Badge variant="outline" className="backdrop-blur-sm bg-blue-500/20 text-blue-200 border-blue-500/30">
                🚀 Overpromise ({analysis.categories.overpromise})
              </Badge>
            )}
            {analysis.categories.money > 0 && (
              <Badge variant="outline" className="backdrop-blur-sm bg-green-500/20 text-green-200 border-green-500/30">
                💰 Money ({analysis.categories.money})
              </Badge>
            )}
            {analysis.categories.unnatural > 0 && (
              <Badge variant="outline" className="backdrop-blur-sm bg-red-500/20 text-red-200 border-red-500/30">
                🤖 Unnatural ({analysis.categories.unnatural})
              </Badge>
            )}
          </div>

          {analysis.foundWords.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-white">Detected spam words:</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.foundWords.map((word, index) => {
                  const categoryColors = {
                    urgency: 'backdrop-blur-sm bg-orange-500/20 text-orange-200',
                    shady: 'backdrop-blur-sm bg-purple-500/20 text-purple-200',
                    overpromise: 'backdrop-blur-sm bg-blue-500/20 text-blue-200',
                    money: 'backdrop-blur-sm bg-green-500/20 text-green-200',
                    unnatural: 'backdrop-blur-sm bg-red-500/20 text-red-200'
                  };
                  
                  return (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-md text-sm ${categoryColors[word.category as keyof typeof categoryColors]}`}
                    >
                      {word.word}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

<div className="text-center mb-12">
  <Badge className="bg-primary/20 text-primary-foreground hover:bg-primary/30 mb-3">OUTIL GRATUIT</Badge>
  <h1 className="text-4xl font-bold mb-2">Spam Checker</h1>
  <p className="text-gray-300 max-w-2xl mx-auto">
    Copiez/collez un message email pour détecter et supprimer les mots spam.
  </p>
</div> 