import React, { useState, useRef } from 'react';
import { 
  Video, 
  Upload, 
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  X,
  Zap,
  Activity,
  Eye,
  BarChart3
} from 'lucide-react';
import './DetectionLayer.css';

// Types for API response
interface SimilarityScores {
  person: number;
  action: number;
  context: number;
  weighted: number;
}

interface Detection {
  timestamp: number;
  frame_idx: number;
  confidence: number;
  blip_description: string;
  similarity_scores: SimilarityScores;
  passed: boolean;
}

interface Segment {
  start_time: number;
  end_time: number;
  confidence: number;
  frame_count: number;
  action_label: string;
  detections: Detection[];
}

interface TimelineSegment {
  index: number;
  start_time: number;
  end_time: number;
  duration: number;
  confidence: number;
  action_label: string;
  frame_count: number;
}

interface TimelineVisualization {
  job_id: string;
  prompt: string;
  action_verb: string;
  video_duration: number;
  segments: TimelineSegment[];
}

interface Stats {
  total_frames: number;
  total_detections: number;
  passed_detections: number;
  success_rate: number;
  segments_found: number;
}

interface DetectionResponse {
  success: boolean;
  job_id: string;
  video_path: string;
  prompt: string;
  action_verb: string;
  timestamp: string;
  video_duration: number;
  stats: Stats;
  passed_detections: Detection[];
  segments: Segment[];
  timeline_visualization: TimelineVisualization;
  error: string | null;
}

const DetectionLayer: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if it's a video file
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!videoFile) {
      setError('Please upload a video file');
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a detection prompt');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append('prompt', prompt);

      const response = await fetch(`${BASE_URL}/video_action/detect/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DetectionResponse = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Detection failed');
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

  return (
    <div className="detection-layer-container">
      {/* Header */}
      <div className="layer-header">
        <div className="header-content">
          <div className="header-icon">
            <Video className="icon-large" />
          </div>
          <div className="header-text">
            <h1>Video Action Detection Layer</h1>
            <p>Upload videos for AI-powered action detection and timeline analysis</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{result?.stats?.total_frames || 0}</span>
            <span className="stat-label">Frames</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{result?.stats?.segments_found || 0}</span>
            <span className="stat-label">Segments</span>
          </div>
        </div>
      </div>

      {/* Upload Panel */}
      <div className="upload-panel">
        <div className="panel-header">
          <h2>Video Analysis Setup</h2>
          <p>Upload your video and specify the action you want to detect</p>
        </div>

        <div className="input-section">
          {/* Prompt Input */}
          <div className="input-group">
            <div className="input-header">
              <label htmlFor="prompt">Detection Prompt</label>
              <span className="input-hint">Describe the action to detect (e.g., "person running")</span>
            </div>
            <div className="prompt-input-wrapper">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter the action you want to detect (e.g., 'person running', 'person walking', 'person jumping')"
                rows={3}
                className="modern-textarea"
              />
              <div className="character-counter">
                {prompt.length}/200
              </div>
            </div>
          </div>

          {/* Video Upload */}
          <div className="input-group">
            <div className="input-header">
              <label>Upload Video</label>
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
                  <div className="upload-icon">
                    <Upload size={40} />
                  </div>
                  <div className="upload-text">
                    <p className="upload-primary">Drop your video here or click to browse</p>
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
              className={`analyze-button-modern ${isAnalyzing ? 'analyzing' : ''}`}
              onClick={handleAnalyze}
              disabled={!videoFile || !prompt.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Analyzing Video...</span>
                  <div className="progress-dots">
                    <span></span><span></span><span></span>
                  </div>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Start Video Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="results-section">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card success">
              <div className="card-icon">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{result.stats?.success_rate?.toFixed(1) || '0.0'}%</span>
                <span className="card-label">Success Rate</span>
              </div>
            </div>
            
            <div className="summary-card info">
              <div className="card-icon">
                <Activity className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{result.stats?.passed_detections || 0}</span>
                <span className="card-label">Detections</span>
              </div>
            </div>
            
            <div className="summary-card primary">
              <div className="card-icon">
                <Play className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{formatTime(result.video_duration || 0)}</span>
                <span className="card-label">Duration</span>
              </div>
            </div>
            
            <div className="summary-card warning">
              <div className="card-icon">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="card-content">
                <span className="card-value">{result.stats?.segments_found || 0}</span>
                <span className="card-label">Segments</span>
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
                <span className="info-label">Prompt</span>
                <span className="info-value">{result.prompt || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Action Verb</span>
                <span className="info-value action-badge">{result.action_verb || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Video</span>
                <span className="info-value">{result.video_path || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="timeline-section">
            <div className="section-header">
              <h3>
                <Eye className="w-5 h-5" />
                Timeline Visualization
              </h3>
              <p>Visual representation of detected action segments</p>
            </div>
            
            <div className="timeline-container">
              <div className="timeline-bar">
                {result.timeline_visualization?.segments && result.timeline_visualization.segments.length > 0 ? (
                  result.timeline_visualization.segments.map((segment) => {
                    const startPercent = (segment.start_time / (result.video_duration || 1)) * 100;
                    const widthPercent = (segment.duration / (result.video_duration || 1)) * 100;
                    
                    return (
                      <div
                        key={segment.index}
                        className={`timeline-segment confidence-${getConfidenceColor(segment.confidence)}`}
                        style={{
                          left: `${startPercent}%`,
                          width: `${Math.max(widthPercent, 2)}%`,
                        }}
                        title={`${segment.action_label}: ${formatTime(segment.start_time)} - ${formatTime(segment.end_time)}`}
                      >
                        <span className="segment-label">{segment.action_label}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-segments-indicator">
                    <span>No action segments detected</span>
                  </div>
                )}
              </div>
              <div className="timeline-labels">
                <span>0:00</span>
                <span>{formatTime((result.video_duration || 0) / 2)}</span>
                <span>{formatTime(result.video_duration || 0)}</span>
              </div>
            </div>

            {/* Segments Detail */}
            <div className="segments-list">
              <h4>Detected Segments</h4>
              {result.timeline_visualization?.segments && result.timeline_visualization.segments.length > 0 ? (
                result.timeline_visualization.segments.map((segment) => (
                  <div key={segment.index} className="segment-card">
                    <div className="segment-header">
                      <div className="segment-title">
                        <span className="segment-index">Segment {segment.index + 1}</span>
                        <span className={`segment-action confidence-${getConfidenceColor(segment.confidence)}`}>
                          {segment.action_label}
                        </span>
                      </div>
                      <div className="segment-confidence">
                        {(segment.confidence * 100).toFixed(1)}% confidence
                      </div>
                    </div>
                    <div className="segment-details">
                      <div className="detail-item">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(segment.start_time)} - {formatTime(segment.end_time)}</span>
                      </div>
                      <div className="detail-item">
                        <Activity className="w-4 h-4" />
                        <span>{segment.duration.toFixed(2)}s duration</span>
                      </div>
                      <div className="detail-item">
                        <Video className="w-4 h-4" />
                        <span>{segment.frame_count} frames</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results-card">
                  <AlertCircle className="w-12 h-12" />
                  <h4>No Segments Detected</h4>
                  <p>The AI could not detect any "{result.action_verb || 'specified action'}" segments in this video. Try adjusting your prompt or using a different video.</p>
                </div>
              )}
            </div>
          </div>

          {/* Passed Detections */}
          <div className="detections-section">
            <div className="section-header">
              <h3>
                <CheckCircle className="w-5 h-5" />
                Passed Detections ({result.passed_detections?.length || 0})
              </h3>
              <p>Individual frame detections that passed the confidence threshold</p>
            </div>
            
            {result.passed_detections && result.passed_detections.length > 0 ? (
              <div className="detections-grid">
                {result.passed_detections.map((detection, index) => (
                  <div key={index} className="detection-card">
                    <div className="detection-header">
                      <span className="frame-badge">Frame {detection.frame_idx}</span>
                      <span className={`confidence-badge confidence-${getConfidenceColor(detection.confidence)}`}>
                        {(detection.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="detection-time">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(detection.timestamp)}</span>
                    </div>
                    
                    <div className="detection-description">
                      <p>{detection.blip_description}</p>
                    </div>
                    
                    <div className="similarity-scores">
                      <h5>Similarity Scores</h5>
                      <div className="scores-grid">
                        <div className="score-item">
                          <span className="score-label">Person</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill person"
                              style={{ width: `${(detection.similarity_scores?.person || 0) * 100}%` }}
                            />
                          </div>
                          <span className="score-value">{((detection.similarity_scores?.person || 0) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="score-item">
                          <span className="score-label">Action</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill action"
                              style={{ width: `${(detection.similarity_scores?.action || 0) * 100}%` }}
                            />
                          </div>
                          <span className="score-value">{((detection.similarity_scores?.action || 0) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="score-item">
                          <span className="score-label">Context</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill context"
                              style={{ width: `${(detection.similarity_scores?.context || 0) * 100}%` }}
                            />
                          </div>
                          <span className="score-value">{((detection.similarity_scores?.context || 0) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="score-item">
                          <span className="score-label">Weighted</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill weighted"
                              style={{ width: `${(detection.similarity_scores?.weighted || 0) * 100}%` }}
                            />
                          </div>
                          <span className="score-value">{((detection.similarity_scores?.weighted || 0) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results-card">
                <AlertCircle className="w-12 h-12" />
                <h4>No Detections Passed</h4>
                <p>No frame detections met the confidence threshold. The video may not contain the specified action or the confidence scores were too low.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectionLayer;
