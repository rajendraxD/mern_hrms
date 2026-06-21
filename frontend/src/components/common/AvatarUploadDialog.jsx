import { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CropIcon from "@mui/icons-material/Crop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCroppedImg, blobToFile } from "../../utils/cropImage";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const CROP_AREA_HEIGHT = 350;

export default function AvatarUploadDialog({
  open,
  onClose,
  currentAvatar,
  userName,
  onUpload,
  uploading = false,
}) {
  // Step: "select" | "crop"
  const [step, setStep] = useState("select");

  // File selection state
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropComplete, setCropComplete] = useState(false);

  // Cropped preview
  const [croppedPreview, setCroppedPreview] = useState(null);

  // Ref to store original imageSrc for recropping
  const originalImageSrcRef = useRef(null);

  const handleReset = useCallback(() => {
    setStep("select");
    setSelectedFile(null);
    setImageSrc(null);
    originalImageSrcRef.current = null;
    // Revoke any old blob URL to prevent memory leaks
    setCroppedPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setError("");
    setDragOver(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropComplete(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleClose = () => {
    if (!uploading) {
      handleReset();
      onClose();
    }
  };

  const validateFile = (file) => {
    if (!file) return "No file selected";
    if (!ACCEPTED_TYPES.includes(file.type))
      return "Please select a JPEG, PNG, WebP, or GIF image.";
    if (file.size > MAX_FILE_SIZE)
      return `File size must be under 5MB (selected: ${(file.size / 1024 / 1024).toFixed(1)}MB).`;
    return "";
  };

  const processFile = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setImageSrc(null);
      setSelectedFile(null);
      return;
    }

    setError("");
    // Revoke old blob URL before replacing
    setCroppedPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropComplete(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target.result;
      setImageSrc(src);
      originalImageSrcRef.current = src;
      setStep("crop");
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    setCropComplete(true);
  }, []);

  const handleApplyCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, outputType);
      const croppedFile = blobToFile(croppedBlob, selectedFile?.name || "avatar.jpg");

      // Revoke old preview blob URL before creating a new one
      setCroppedPreview((prev) => {
        if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
        return null;
      });

      // Generate preview of cropped result
      const previewUrl = URL.createObjectURL(croppedBlob);
      setCroppedPreview(previewUrl);

      // Replace selected file with cropped version
      setSelectedFile(croppedFile);
      setStep("select");
    } catch (err) {
      setError("Failed to crop image. Please try again.");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    onUpload(selectedFile);
  };

  const handleBackToSelect = () => {
    setStep("select");
  };

  // Compute output type based on original file name
  const outputType = selectedFile?.name
    ? `image/${selectedFile.name.split(".").pop().toLowerCase()}`
    : "image/jpeg";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {step === "crop" ? <CropIcon color="primary" /> : <PhotoCameraIcon color="primary" />}
          <Typography variant="h6" fontWeight={600}>
            {step === "crop" ? "Crop Your Picture" : "Change Profile Picture"}
          </Typography>
        </Box>
        {!uploading && (
          <IconButton aria-label="close" onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, overflow: "hidden" }}>
        {step === "crop" && imageSrc ? (
          /* --- CROP STEP --- */
          <Box>
            {/* Cropper area */}
            <Box sx={{ position: "relative", width: "100%", height: CROP_AREA_HEIGHT, bgcolor: "#000" }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={true}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>

            {/* Zoom slider */}
            <Box sx={{ px: 3, py: 2 }}>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, value) => setZoom(value)}
                sx={{ mx: "auto", display: "block" }}
              />
            </Box>
          </Box>
        ) : (
          /* --- SELECT STEP --- */
          <Box sx={{ p: 3 }}>
            {/* Current & Cropped preview avatars */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, mb: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                  Current
                </Typography>
                <Avatar
                  src={getAvatarUrl(currentAvatar)}
                  alt={userName || "User"}
                  sx={{ width: 80, height: 80, mx: "auto", fontSize: "2rem" }}
                >
                  {userName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Box>

              <Typography variant="h5" color="text.disabled">
                →
              </Typography>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                  {croppedPreview ? "Cropped" : "New"}
                </Typography>
                <Avatar
                  src={croppedPreview || undefined}
                  alt="New avatar preview"
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    fontSize: "2rem",
                    outline: croppedPreview ? "3px solid" : "none",
                    outlineColor: "primary.main",
                  }}
                >
                  {!croppedPreview && "?"}
                </Avatar>
              </Box>
            </Box>

            {/* Drop zone */}
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: "2px dashed",
                borderColor: dragOver ? "primary.main" : error ? "error.main" : "divider",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                bgcolor: dragOver ? "action.hover" : "transparent",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "action.hover",
                },
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />

              <CloudUploadIcon sx={{ fontSize: 48, color: dragOver ? "primary.main" : "text.disabled", mb: 1 }} />

              <Typography variant="body1" fontWeight={500} color={dragOver ? "primary.main" : "text.primary"}>
                {dragOver ? "Drop your image here" : "Click or drag & drop to upload"}
              </Typography>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                JPEG, PNG, WebP, or GIF — Max 5MB
              </Typography>
            </Box>

            {/* Error message */}
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1.5, textAlign: "center" }}>
                {error}
              </Typography>
            )}

            {/* Selected file info */}
            {selectedFile && !error && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block", textAlign: "center" }}>
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button onClick={step === "crop" ? handleBackToSelect : handleClose} disabled={uploading} color="inherit">
          {step === "crop" ? "Back" : "Cancel"}
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          {step === "crop" ? (
            <Button
              onClick={handleApplyCrop}
              variant="contained"
              disabled={!cropComplete}
              startIcon={<CropIcon />}
            >
              Apply Crop
            </Button>
          ) : (
            <>
              {selectedFile && !croppedPreview && (
                <Button onClick={handleReset} disabled={uploading} color="inherit">
                  Reset
                </Button>
              )}
              {selectedFile && croppedPreview && (
                <Button
                  onClick={() => {
                    // Reopen cropper with the original image to avoid quality loss
                    setImageSrc(originalImageSrcRef.current);
                    setStep("crop");
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                    setCropComplete(false);
                    setCroppedAreaPixels(null);
                  }}
                  disabled={uploading}
                  color="inherit"
                  startIcon={<CropIcon />}
                >
                  Recrop
                </Button>
              )}
              <Button
                onClick={handleUpload}
                variant="contained"
                disabled={!selectedFile || !!error || uploading || !croppedPreview}
                startIcon={uploading ? <CircularProgress size={18} color="inherit" /> : <CloudUploadIcon />}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
