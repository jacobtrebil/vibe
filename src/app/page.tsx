'use client';

 
export default function Chat() {

  const goToFoodDetection = () => {
    window.location.href = '/fooddetection';
  }

  const goToWhoopData = () => {
    window.location.href = '/whoop';
  }

  const goToHealthGPT = () => {
    window.location.href = 'https://chat.openai.com/g/g-T78cMCV5j-vibe-chat';
  }

  return (
    <div className="main">
      <h1>Vibe</h1>
      <a href="https://chat.openai.com/" target="_blank" ><button className="button">Vibe Chat →</button></a><br></br>
      <button className="button" onClick={goToFoodDetection}>Food Detection →</button><br></br>
      <button className="button" onClick={goToWhoopData}>Health Impact →</button><br></br>
    </div>
  );
}