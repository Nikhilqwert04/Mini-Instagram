import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [image, setimage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDragON, setisDragON] = useState(false);
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      const preview = URL.createObjectURL(file);
      setimage(preview);
      setImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setisDragON(true);
  };

  const handleonDrageleave = (e) => {
    e.preventDefault();
    setisDragON(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setimage(preview);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !description.trim()) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("description", description);
    formData.append("visibility", visibility);

    try {
      await axios.post("/api/v1/post/createpost", formData, {
        withCredentials: true,
      });

      navigate("/dashboard/my-posts");
    } catch (error) {
      console.error("Create post error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 md:px-0">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-8 shadow-2xl flex flex-col">
        <h1 className="text-2xl font-bold text-white mb-6">Create Post</h1>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Upload File (Preserving your exact UI & code) */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-zinc-300 mb-2">Upload File</h4>
              <label htmlFor="upload" className="cursor-pointer">
                <div
                  className={`w-full h-60 sm:h-96 md:h-110 flex justify-center items-center border-2 border-dashed rounded-2xl border-[#3d3737c5] overflow-auto ${
                    isDragON ? "bg-[#534646]" : "bg-transparent"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragLeave={handleonDrageleave}
                >
                  {image ? <img src={image} className="max-h-full object-contain" /> : <p className="text-zinc-500 text-sm">Upload Image</p>}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="upload"
                    hidden
                  />
                </div>
              </label>
            </div>


            <div className="flex-1 flex flex-col justify-between space-y-6">

              <div className="space-y-2 flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-zinc-300">
                    Description / Caption
                  </label>
                  <span className="text-xs text-zinc-500">
                    {description.length}/500
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                  placeholder="What's on your mind?..."
                  className="w-full flex-1 min-h-[140px] px-5 py-4 rounded-2xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition text-sm resize-none"
                />
              </div>

              {/* Visibility Option */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-300">
                  Visibility
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setVisibility("public")}
                    className={`py-3.5 px-4 rounded-xl border text-sm font-semibold transition flex items-center justify-center gap-2 ${
                      visibility === "public"
                        ? "bg-blue-600/10 border-blue-500 text-blue-400"
                        : "bg-zinc-800/30 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    🌐 Public
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibility("private")}
                    className={`py-3.5 px-4 rounded-xl border text-sm font-semibold transition flex items-center justify-center gap-2 ${
                      visibility === "private"
                        ? "bg-blue-600/10 border-blue-500 text-blue-400"
                        : "bg-zinc-800/30 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    🔒 Private
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                 {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Creating Post...</span>
                  </div>
                ) : (
                  "Share Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
