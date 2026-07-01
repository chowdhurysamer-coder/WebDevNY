import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LogoMark } from "@/components/Logo";

describe("LogoMark", () => {
  it("renders an svg at the requested size", () => {
    const { container } = render(<LogoMark size={48} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("width")).toBe("48");
  });
});
