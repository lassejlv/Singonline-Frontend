import "../styles/index.scss"; // Import the global styles
import { API_URL } from "../main";
import { Tables } from "../types";

const HandleSongs = async () => {
  const response = await fetch(`${API_URL}/songs`);

  if (!response.ok) {
    const element = document.createElement("p");
    element.textContent = `Failed to fetch songs: ${response.status} - ${response.statusText}`;
    element.style.color = "red";
    document.body.appendChild(element);
    return;
  }

  const data = (await response.json()) as Tables<"Songs">[];

  const List = document.getElementById("songs-list") as HTMLDivElement;

  List.innerHTML = `${data.map((song) => `<h1>${song.title}</h1>`).join("")}`;
};

HandleSongs();
