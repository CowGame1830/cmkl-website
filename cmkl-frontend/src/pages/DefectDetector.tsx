import React, { useState, useRef } from 'react';
import { defectDetections } from '../data/mockData';
import type { DefectDetection } from '../data/types';
import { 
  Search, 
  CheckCircle, 
  Clock,
  FileImage,
  X
} from 'lucide-react';
import './DefectDetector.css';

const DefectDetector: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DefectDetection[]>(defectDetections);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!prompt.trim()) {
      alert('Please enter a detection prompt');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: DefectDetection = {
        id: `detect-${Date.now()}`,
        prompt: prompt,
        imageUrl: imagePreview || 'https://images.unsplash.com/photo-1581092795706-519d8c0c1fd0?w=400&h=300&fit=crop',
        detectedDefects: [
          {
            id: `defect-${Date.now()}`,
            type: 'Surface Anomaly',
            description: `Detected based on prompt: "${prompt}"`,
            severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
            location: {
              x: Math.floor(Math.random() * 300),
              y: Math.floor(Math.random() * 200),
              width: Math.floor(Math.random() * 100) + 50,
              height: Math.floor(Math.random() * 50) + 25
            },
            confidence: Math.random() * 0.3 + 0.7 // 0.7 to 1.0
          }
        ],
        timestamp: new Date().toISOString(),
        confidence: Math.random() * 0.3 + 0.7,
        status: 'completed'
      };

      setResults(prev => [mockResult, ...prev]);
      setIsAnalyzing(false);
      setPrompt('');
      setImagePreview(null);
    }, 3000);
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };



  const getStatusIcon = (status: DefectDetection['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing': return <Clock className="w-5 h-5 text-yellow-600 animate-spin" />;
      case 'failed': return <X className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('th-TH');
  };

  return (
    <div className="defect-detector-container">
      {/* Modern Header with Gradient */}
      <div className="detector-header">
        <div className="header-content">
          <div className="header-icon">
            <Search className="icon-large" />
          </div>
          <div className="header-text">
            <h1>AI Defect Detection System</h1>
            <p>Advanced AI-powered quality control and defect identification</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{results.length}</span>
            <span className="stat-label">Analyses</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {results.filter(r => r.detectedDefects.length > 0).length}
            </span>
            <span className="stat-label">Issues Found</span>
          </div>
        </div>
      </div>

      {/* Modern Detection Panel */}
      <div className="detection-panel">
        <div className="panel-header">
          <h2>Quality Analysis Setup</h2>
          <p>Configure your detection parameters and upload images for analysis</p>
        </div>
        
        <div className="input-section">
          <div className="input-group prompt-group">
            <div className="input-header">
              <label htmlFor="prompt">Detection Prompt</label>
              <span className="input-hint">Be specific about defect types</span>
            </div>
            <div className="prompt-input-wrapper">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter what you want to detect (e.g., 'Detect surface scratches on metal components', 'Check for welding defects', 'Find cracks or dents')"
                rows={3}
                className="modern-textarea"
              />
              <div className="character-counter">
                {prompt.length}/500
              </div>
            </div>
          </div>

          <div className="input-group upload-group">
            <div className="input-header">
              <label>Upload Image</label>
              <span className="input-hint">High-quality images work best</span>
            </div>
            <div className={`upload-area ${imagePreview ? 'has-image' : ''}`}>
              {imagePreview ? (
                <div className="image-preview-modern">
                  <img src={imagePreview} alt="Preview" />
                  <div className="image-overlay">
                    <button
                      className="remove-image-modern"
                      onClick={clearImage}
                      type="button"
                    >
                      <X size={16} />
                    </button>
                    <div className="image-info">
                      <span className="image-name">Uploaded Image</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="upload-placeholder-modern"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-icon">
                    <FileImage size={32} />
                  </div>
                  <div className="upload-text">
                    <p className="upload-primary">Drop your image here or click to browse</p>
                    <p className="upload-secondary">Supports PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="action-group mt-4">
            <button
              className={`analyze-button-modern ${isAnalyzing ? 'analyzing' : ''}`}
              onClick={handleAnalyze}
              disabled={!prompt.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Start Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Results Section */}
      {results.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Analysis Results</h2>
            <div className="results-summary">
              {results.length} analysis{results.length !== 1 ? 'es' : ''} completed
            </div>
          </div>
          
          <div className="results-grid">
            {results.map((result) => (
              <div key={result.id} className="result-card-modern">
                <div className="result-header-modern">
                  <div className="result-status-modern">
                    <div className={`status-indicator ${result.status}`}>
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="status-info">
                      <span className="status-text-modern">
                        {result.detectedDefects.length > 0 ? 'Issues Detected' : 'No Issues Found'}
                      </span>
                      <span className="result-time-modern">{formatTime(result.timestamp)}</span>
                    </div>
                  </div>
                  <div className="confidence-badge">
                    {Math.round(result.confidence * 100)}% confident
                  </div>
                </div>

                <div className="result-content-modern">
                  <div className="result-image-modern">
                    <img src={result.imageUrl} alt="Analyzed" />
                    <div className="defect-overlays">
                      {result.detectedDefects.map((defect) => (
                        <div
                          key={defect.id}
                          className={`defect-overlay-modern severity-${defect.severity}`}
                          style={{
                            left: `${(defect.location.x / 400) * 100}%`,
                            top: `${(defect.location.y / 300) * 100}%`,
                            width: `${(defect.location.width / 400) * 100}%`,
                            height: `${(defect.location.height / 300) * 100}%`
                          }}
                          title={`${defect.type} - ${defect.severity} severity`}
                        />
                      ))}
                    </div>
                    {result.detectedDefects.length > 0 && (
                      <div className="defect-count-badge">
                        {result.detectedDefects.length} issue{result.detectedDefects.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  <div className="result-details-modern">
                    <div className="prompt-display-modern">
                      <h4>Analysis Prompt</h4>
                      <p>{result.prompt}</p>
                    </div>
                    
                    <div className="defects-section">
                      <h4>
                        Detected Issues 
                        <span className="issue-count">({result.detectedDefects.length})</span>
                      </h4>
                      
                      {result.detectedDefects.length > 0 ? (
                        <div className="defects-list-modern">
                          {result.detectedDefects.map((defect) => (
                            <div key={defect.id} className="defect-item-modern">
                              <div className="defect-main">
                                <div className="defect-header-modern">
                                  <span className="defect-type-modern">{defect.type}</span>
                                  <span className={`defect-severity-modern severity-${defect.severity}`}>
                                    {defect.severity}
                                  </span>
                                </div>
                                <p className="defect-description-modern">{defect.description}</p>
                              </div>
                              <div className="defect-confidence-modern">
                                {Math.round(defect.confidence * 100)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-defects-modern">
                          <CheckCircle size={20} />
                          <span>No defects detected - Quality check passed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DefectDetector;