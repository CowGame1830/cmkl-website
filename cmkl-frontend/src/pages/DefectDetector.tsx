import React, { useState, useRef } from 'react';
import { defectDetections } from '../data/mockData';
import { sampleImages, detectionPrompts } from '../data/enhancedMockData';
import type { DefectDetection } from '../data/types';
import { 
  Search, 
  CheckCircle, 
  Clock,
  FileImage,
  X,
  Lightbulb,
  Image,
  Zap
} from 'lucide-react';
import './DefectDetector.css';

const DefectDetector: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DefectDetection[]>(defectDetections);
  const [showSampleImages, setShowSampleImages] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setSelectedImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleImageSelect = (image: typeof sampleImages[0]) => {
    setImagePreview(image.url);
    setSelectedImageName(image.name);
    setShowSampleImages(false);
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    setShowPromptSuggestions(false);
  };

  const getFilteredPrompts = () => {
    if (selectedCategory === 'all') {
      return detectionPrompts.flatMap(category => 
        category.prompts.map(prompt => ({ prompt, category: category.category }))
      );
    }
    const categoryData = detectionPrompts.find(cat => cat.category === selectedCategory);
    return categoryData ? categoryData.prompts.map(prompt => ({ prompt, category: selectedCategory })) : [];
  };

  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return sampleImages;
    }
    return sampleImages.filter(image => image.category === selectedCategory);
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
          {/* Category Filter */}
          <div className="category-filter">
            <label>Industry Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="welding">Welding</option>
              <option value="machining">Machining</option>
              <option value="coating">Coating/Paint</option>
              <option value="plastics">Plastics</option>
              <option value="textile">Textile</option>
              <option value="packaging">Packaging</option>
            </select>
          </div>

          <div className="input-group prompt-group">
            <div className="input-header">
              <label htmlFor="prompt">Detection Prompt</label>
              <div className="input-actions">
                <span className="input-hint">Be specific about defect types</span>
                <button
                  type="button"
                  className="suggestion-btn"
                  onClick={() => setShowPromptSuggestions(!showPromptSuggestions)}
                  title="View prompt suggestions"
                >
                  <Lightbulb className="w-4 h-4" />
                  Suggestions
                </button>
              </div>
            </div>
            
            {showPromptSuggestions && (
              <div className="prompt-suggestions">
                <h4>Suggested Prompts for {selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}:</h4>
                <div className="suggestions-grid">
                  {getFilteredPrompts().slice(0, 8).map((item, index) => (
                    <div 
                      key={index} 
                      className="suggestion-item"
                      onClick={() => handlePromptSelect(item.prompt)}
                    >
                      <span className="suggestion-category">{item.category}</span>
                      <span className="suggestion-text">{item.prompt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
              <label>Upload or Select Image</label>
              <div className="input-actions">
                <span className="input-hint">High-quality images work best</span>
                <button
                  type="button"
                  className="sample-images-btn"
                  onClick={() => setShowSampleImages(!showSampleImages)}
                  title="Choose from sample images"
                >
                  <Image className="w-4 h-4" />
                  Sample Images
                </button>
              </div>
            </div>
            
            {showSampleImages && (
              <div className="sample-images-grid">
                <h4>Sample Images for {selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}:</h4>
                <div className="images-grid">
                  {getFilteredImages().map((image) => (
                    <div 
                      key={image.id} 
                      className="sample-image-item"
                      onClick={() => handleSampleImageSelect(image)}
                    >
                      <img src={image.url} alt={image.name} />
                      <div className="image-item-info">
                        <span className="image-item-name">{image.name}</span>
                        <span className="image-item-category">{image.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
                      <span className="image-name">{selectedImageName || 'Uploaded Image'}</span>
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
                  <span>AI Analysis in Progress...</span>
                  <div className="progress-dots">
                    <span></span><span></span><span></span>
                  </div>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Start AI Analysis</span>
                </>
              )}
            </button>
            
            <div className="analysis-info">
              <span className="analysis-stats">
                {results.length} total analyses • {results.filter(r => r.detectedDefects.length > 0).length} with issues detected
              </span>
            </div>
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