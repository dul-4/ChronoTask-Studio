# ChronoTask Studio

<img width="1610" height="852" alt="Captura de pantalla 2026-11-09 064321" src="https://github.com/user-attachments/assets/a088e530-4fa4-43ff-900e-c3f60ea1d1b1" />


## Description

ChronoTask Studio is an experimental and basic web-based productivity prototype. It features a customizable Pomodoro timer with multiple focus and break modes, a local task manager with `localStorage` persistence, and a synthetic web-audio-based forest wind ambient sound generator. Designed for clean productivity and tracked focus hours, it runs entirely on the client side.

---

## Features

### 1. Pomodoro Timer
- Switchable modes: Focus (25m), Short Break (5m), and Long Break (15m).
<img width="775" height="607" alt="Captura de pantalla 2026-11-09 064357" src="https://github.com/user-attachments/assets/9f7bbb58-894d-42f7-bb06-bb1b2a6ad5b7" />


### 2. Active Task Flow
- Task creation, completion toggling, and deletion.
- Persistent task management using browser `localStorage`.
<img width="515" height="607" alt="Captura de pantalla 2026-11-09 064421" src="https://github.com/user-attachments/assets/31e374b1-a920-48ec-accc-e0ce9402968f" />


### 3. Synthetic Ambient Audio
- Built-in Web Audio API synthesizer generating a relaxing forest wind ambiance without requiring external audio files.
<img width="1596" height="833" alt="Captura de pantalla 2026-11-09 064449" src="https://github.com/user-attachments/assets/c93c48cf-b3b4-406e-b579-072ec49b02e6" />


---

## Getting Started

### Dependencies
- A modern web browser (Google Chrome, Firefox, Microsoft Edge, Safari).
- No backend environment or Node.js installation required (runs 100% client-side).

### Executing Program
- Open the `index.html` file directly in your web browser or use a local development server (like *Live Server* in VS Code).
- Select your timer mode, organize your task list, or toggle the ambient audio to begin your focus session.

## Help

If any part of the interface fails to respond or local storage encounters an issue, check your browser's developer console (`F12`) to verify that all scripts loaded correctly.

## Authors

- **Me**

## Version History

- 0.1
  * Initial Release: Functional Pomodoro timer, task manager with local storage, and synthetic ambient wind generator.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Special thanks to **Gemini AI** for guiding me through learning JavaScript, helping write and refine core logic in `script.js`, correcting errors and bugs, and assisting in implementing the synthetic web-audio generator.
