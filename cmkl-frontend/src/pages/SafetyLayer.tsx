import React, { useState, useRef } from 'react';
import { 
  Video, 
  Upload, 
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  X,
  Zap,
  Shield,
  Eye,
  Settings,
  HardHat,
  Camera
} from 'lucide-react';
import './SafetyLayer.css';

// Types for Qwen Detection API response
interface FrameAnalysis {
  frame_idx: number;
  timestamp: number;
  action_detected: boolean;
  confidence: number;
  description: string;
}

interface Statistics {
  total_frames_analyzed: number;
  frames_with_action: number;
  detection_rate: number;
  avg_confidence: number;
  max_confidence: number;
}

interface QwenDetectionResponse {
  success: boolean;
  job_id: string;
  video_path: string;
  action_prompt: string;
  timestamp: string;
  video_duration: number;
  statistics: Statistics;
  frame_analyses: FrameAnalysis[];
  violations: FrameAnalysis[];
  error: string | null;
}

const SafetyLayer: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [actionPrompt, setActionPrompt] = useState('');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const [frameSampleRate, setFrameSampleRate] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<QwenDetectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedViolation, setSelectedViolation] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Please upload a valid video file');
        return;
      }
      
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const clearVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview(null);
    setResult(null);
    setError(null);
    setSelectedViolation(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!videoFile) {
      setError('Please upload a video file');
      return;
    }

    if (!actionPrompt.trim()) {
      setError('Please enter a safety detection prompt');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append('action_prompt', actionPrompt);
      formData.append('confidence_threshold', confidenceThreshold.toString());
      formData.append('frame_sample_rate', frameSampleRate.toString());

      const response = await fetch(`${BASE_URL}/qwen/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QwenDetectionResponse = await response.json();
      
      if (data.success) {
        setResult(data);
        setSelectedViolation(null);
      } else {
        setError(data.error || 'Safety detection failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze video');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.7) return 'high';
    if (confidence >= 0.5) return 'medium';
    return 'low';
  };

  const getSeverityLevel = (detectionRate: number): { level: string; color: string } => {
    if (detectionRate >= 0.5) return { level: 'Critical', color: 'critical' };
    if (detectionRate >= 0.25) return { level: 'Warning', color: 'warning' };
    if (detectionRate > 0) return { level: 'Minor', color: 'minor' };
    return { level: 'Safe', color: 'safe' };
  };

  // Example prompts for safety detection
  const examplePrompts = [
    "detect if not wearing yellow helmet",
    "detect if not wearing safety vest",
    "detect if not wearing safety goggles",
    "detect if not wearing gloves",
    "detect person in restricted area",
    "detect improper lifting posture"
  ];

  return (
    <div className="safety-layer-container">
      {/* Header */}
      <div className="safety-header">
        <div className="header-content">
          <div className="header-icon">
            <Shield className="icon-large" />
          </div>
          <div className="header-text">
            <h1>Safety Compliance Layer</h1>
            <p>AI-powered safety violation detection using Qwen Vision</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">
              {result?.statistics?.total_frames_analyzed || 0}
            </span>
            <span className="stat-label">Frames Analyzed</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-number">
              {result?.violations?.length || 0}
            </span>
            <span className="stat-label">Violations Found</span>
          </div>
        </div>
      </div>

      {/* Upload Panel */}
      <div className="upload-panel">
        <div className="panel-header">
          <h2>Safety Analysis Setup</h2>
          <p>Upload your video and configure safety detection parameters</p>
        </div>

        <div className="input-section">
          {/* Safety Prompt Input */}
          <div className="input-group">
            <div className="input-header">
              <label htmlFor="actionPrompt">
                <HardHat className="w-4 h-4 inline mr-2" />
                Safety Detection Prompt
              </label>
              <span className="input-hint">Describe the safety violation to detect</span>
            </div>
            <div className="prompt-input-wrapper">
              <textarea
                id="actionPrompt"
                value={actionPrompt}
                onChange={(e) => setActionPrompt(e.target.value)}
                placeholder="Enter the safety condition to detect (e.g., 'detect if not wearing yellow helmet')"
                rows={3}
                className="modern-textarea"
              />
              <div className="character-counter">
                {actionPrompt.length}/500
              </div>
            </div>
            
            {/* Example Prompts */}
            <div className="example-prompts">
              <span className="example-label">Quick prompts:</span>
              <div className="prompt-chips">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="prompt-chip"
                    onClick={() => setActionPrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detection Settings */}
          <div className="input-group">
            <div className="input-header">
              <label>
                <Settings className="w-4 h-4 inline mr-2" />
                Detection Parameters
              </label>
              <span className="input-hint">Fine-tune the detection sensitivity</span>
            </div>
            <div className="settings-grid">
              <div className="setting-item">
                <label htmlFor="confidence">Confidence Threshold</label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="confidence"
                    min="0.1"
                    max="0.9"
                    step="0.1"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                    className="confidence-slider"
                  />
                  <span className="slider-value">{(confidenceThreshold * 100).toFixed(0)}%</span>
                </div>
                <p className="setting-hint">Minimum confidence to flag as violation</p>
              </div>
              <div className="setting-item">
                <label htmlFor="frameRate">Frame Sample Rate</label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="frameRate"
                    min="1"
                    max="10"
                    step="1"
                    value={frameSampleRate}
                    onChange={(e) => setFrameSampleRate(parseInt(e.target.value))}
                    className="confidence-slider"
                  />
                  <span className="slider-value">{frameSampleRate} fps</span>
                </div>
                <p className="setting-hint">Frames to analyze per second</p>
              </div>
            </div>
          </div>

          {/* Video Upload */}
          <div className="input-group">
            <div className="input-header">
              <label>
                <Camera className="w-4 h-4 inline mr-2" />
                Upload Safety Footage
              </label>
              <span className="input-hint">Supports MP4, MOV, AVI, WebM</span>
            </div>
            
            <div className={`video-upload-area ${videoPreview ? 'has-video' : ''}`}>
              {videoPreview ? (
                <div className="video-preview-modern">
                  <video 
                    src={videoPreview} 
                    controls 
                    className="preview-video"
                  />
                  <div className="video-overlay">
                    <button
                      className="remove-video-btn"
                      onClick={clearVideo}
                      type="button"
                    >
                      <X size={16} />
                    </button>
                    <div className="video-info">
                      <span className="video-name">{videoFile?.name}</span>
                      <span className="video-size">
                        {videoFile && (videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="upload-placeholder-modern"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-icon safety">
                    <Upload size={40} />
                  </div>
                  <div className="upload-text">
                    <p className="upload-primary">Drop your safety footage here or click to browse</p>
                    <p className="upload-secondary">Supports MP4, MOV, AVI, WebM up to 100MB</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Analyze Button */}
          <div className="action-group">
            <button
              className={`analyze-button-modern safety ${isAnalyzing ? 'analyzing' : ''}`}
              onClick={handleAnalyze}
              disabled={!videoFile || !actionPrompt.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Analyzing Safety Footage...</span>
                  <div className="progress-dots">
                    <span></span><span></span><span></span>
                  </div>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Start Safety Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="results-section">
          {/* Severity Banner */}
          {(() => {
            const severity = getSeverityLevel(result.statistics?.detection_rate || 0);
            return (
              <div className={`severity-banner ${severity.color}`}>
                <div className="severity-content">
                  <div className="severity-icon">
                    {severity.level === 'Safe' ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : severity.level === 'Critical' ? (
                      <AlertCircle className="w-8 h-8" />
                    ) : (
                      <AlertTriangle className="w-8 h-8" />
                    )}
                  </div>
                  <div className="severity-text">
                    <h3>Safety Status: {severity.level}</h3>
                    <p>
                      {severity.level === 'Safe' 
                        ? 'No safety violations detected in the analyzed footage'
                        : `${result.violations?.length || 0} violation(s) detected with ${((result.statistics?.detection_rate || 0) * 100).toFixed(1)}% detection rate`
                      }
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card info">
              <div className="card-icon">
                <Video className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{result.statistics?.total_frames_analyzed || 0}</span>
                <span className="card-label">Frames Analyzed</span>
              </div>
            </div>
            
            <div className="summary-card warning">
              <div className="card-icon">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{result.violations?.length || 0}</span>
                <span className="card-label">Violations</span>
              </div>
            </div>
            
            <div className="summary-card primary">
              <div className="card-icon">
                <Eye className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{((result.statistics?.detection_rate || 0) * 100).toFixed(1)}%</span>
                <span className="card-label">Detection Rate</span>
              </div>
            </div>
            
            <div className="summary-card success">
              <div className="card-icon">
                <Zap className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{((result.statistics?.avg_confidence || 0) * 100).toFixed(1)}%</span>
                <span className="card-label">Avg Confidence</span>
              </div>
            </div>
          </div>

          {/* Job Info */}
          <div className="job-info-card">
            <h3>Analysis Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Job ID</span>
                <span className="info-value">{result.job_id || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Detection Prompt</span>
                <span className="info-value prompt-value">{result.action_prompt || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Video Duration</span>
                <span className="info-value">{formatTime(result.video_duration || 0)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Max Confidence</span>
                <span className="info-value">{((result.statistics?.max_confidence || 0) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Violations Timeline */}
          <div className="violations-section">
            <div className="section-header">
              <h3>
                <AlertTriangle className="w-5 h-5" />
                Safety Violations Timeline
              </h3>
              <p>Detected violations throughout the video</p>
            </div>
            
            {result.violations && result.violations.length > 0 ? (
              <>
                {/* Timeline Bar */}
                <div className="timeline-container">
                  <div className="timeline-bar safety">
                    {result.violations.map((violation, index) => {
                      const positionPercent = (violation.timestamp / (result.video_duration || 1)) * 100;
                      
                      return (
                        <div
                          key={index}
                          className={`timeline-marker ${selectedViolation === index ? 'selected' : ''} confidence-${getConfidenceColor(violation.confidence)}`}
                          style={{ left: `${positionPercent}%` }}
                          onClick={() => setSelectedViolation(index)}
                          title={`Violation at ${formatTime(violation.timestamp)} - ${(violation.confidence * 100).toFixed(1)}% confidence`}
                        />
                      );
                    })}
                  </div>
                  <div className="timeline-labels">
                    <span>0:00</span>
                    <span>{formatTime((result.video_duration || 0) / 2)}</span>
                    <span>{formatTime(result.video_duration || 0)}</span>
                  </div>
                </div>

                {/* Violations List */}
                <div className="violations-grid">
                  {result.violations.map((violation, index) => (
                    <div 
                      key={index} 
                      className={`violation-card ${selectedViolation === index ? 'selected' : ''}`}
                      onClick={() => setSelectedViolation(index)}
                    >
                      <div className="violation-header">
                        <div className="violation-badge">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Violation #{index + 1}</span>
                        </div>
                        <span className={`confidence-badge confidence-${getConfidenceColor(violation.confidence)}`}>
                          {(violation.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="violation-time">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(violation.timestamp)}</span>
                        <span className="frame-info">Frame {violation.frame_idx}</span>
                      </div>
                      
                      <div className="violation-description">
                        <p>{violation.description || 'Safety violation detected'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results-card success">
                <CheckCircle className="w-12 h-12" />
                <h4>No Violations Detected</h4>
                <p>The AI did not detect any "{result.action_prompt}" violations in this video. All analyzed frames appear to be compliant.</p>
              </div>
            )}
          </div>

          {/* All Frame Analyses */}
          {result.frame_analyses && result.frame_analyses.length > 0 && (
            <div className="analyses-section">
              <div className="section-header">
                <h3>
                  <Eye className="w-5 h-5" />
                  Frame-by-Frame Analysis ({result.frame_analyses.length} frames)
                </h3>
                <p>Detailed analysis of each sampled frame</p>
              </div>
              
              <div className="analyses-grid">
                {result.frame_analyses.slice(0, 20).map((analysis, index) => (
                  <div 
                    key={index} 
                    className={`analysis-card ${analysis.action_detected ? 'violation' : 'safe'}`}
                  >
                    <div className="analysis-header">
                      <span className="frame-badge">Frame {analysis.frame_idx}</span>
                      <span className={`status-badge ${analysis.action_detected ? 'violation' : 'safe'}`}>
                        {analysis.action_detected ? (
                          <>
                            <AlertTriangle className="w-3 h-3" />
                            Violation
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Safe
                          </>
                        )}
                      </span>
                    </div>
                    
                    <div className="analysis-time">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(analysis.timestamp)}</span>
                    </div>
                    
                    {analysis.action_detected && (
                      <div className="analysis-confidence">
                        <span className="confidence-label">Confidence:</span>
                        <div className="confidence-bar-small">
                          <div 
                            className={`confidence-fill-small confidence-${getConfidenceColor(analysis.confidence)}`}
                            style={{ width: `${analysis.confidence * 100}%` }}
                          />
                        </div>
                        <span className="confidence-value">{(analysis.confidence * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    
                    {analysis.description && (
                      <div className="analysis-description">
                        <p>{analysis.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {result.frame_analyses.length > 20 && (
                <div className="show-more-info">
                  <p>Showing 20 of {result.frame_analyses.length} analyzed frames</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SafetyLayer;
