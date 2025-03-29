import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Appel du script Python qui gère la prédiction
    const pythonProcess = spawn('python', [
      path.join(process.cwd(), 'src/models/predict.py'),
      text
    ]);

    return new Promise((resolve) => {
      let result = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          resolve(NextResponse.json({ error: 'Prediction failed' }, { status: 500 }));
          return;
        }

        try {
          const prediction = JSON.parse(result);
          resolve(NextResponse.json({
            prediction: prediction.score,
            isSpam: prediction.is_spam
          }));
        } catch (e) {
          resolve(NextResponse.json({ error: 'Invalid prediction result' }, { status: 500 }));
        }
      });
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json({ error: 'Failed to process prediction' }, { status: 500 });
  }
} 