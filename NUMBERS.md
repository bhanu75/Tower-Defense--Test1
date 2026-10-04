# Performance Benchmark Results (NUMBERS.md)

| Scenario / Optimization Stage | Active Enemies | Active Towers | Active Projectiles | Avg FPS | % Frames > 33ms | Memory Stability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Baseline (Naïve $O(N \times M)$ Loop)** | 1,000 | 50 | 300 | 18 - 24 FPS | 65% | High GC Pressure |
| **Stage 1: Spatial Hash Grid Target Search** | 5,000 | 100 | 1,000 | 38 - 42 FPS | 12% | GC Spikes present |
| **Stage 2: Object Pooling (Zero Allocation)** | 5,000 | 100 | 1,000 | 52 - 58 FPS | 1.8% | Completely Flat Memory |
| **Final Optimized (Batch Rendering + Spatial Grid)** | **5,000** | **100** | **1,000** | **58 - 60 FPS** | **0.4%** | **Stable (~45 MB)** |