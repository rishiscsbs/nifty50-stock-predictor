"""Terminal styling helpers (report CLI look)."""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

try:
    from colorama import Fore, Style, init as colorama_init

    colorama_init(autoreset=True)
except ImportError:  # pragma: no cover
    class _Dummy:
        def __getattr__(self, _):
            return ""

    Fore = Style = _Dummy()  # type: ignore

    def colorama_init(*_a, **_k):
        pass


WIDTH = 56
BANNER_CHAR = "="
RULE_CHAR = "-"


def ok(msg: str) -> None:
    print(f"{Fore.GREEN}[+]{Style.RESET_ALL} {msg}")


def info(msg: str) -> None:
    print(f"{Fore.CYAN}{msg}{Style.RESET_ALL}")


def warn(msg: str) -> None:
    print(f"{Fore.YELLOW}[*]{Style.RESET_ALL} {msg}")


def banner(title: str) -> None:
    line = BANNER_CHAR * WIDTH
    print(line)
    print(title.center(WIDTH))
    print(line)


def rule() -> None:
    print(RULE_CHAR * WIDTH)


def prompt_choice() -> str:
    return input(f"{Fore.YELLOW}Enter your choice (1-10): {Style.RESET_ALL}")


def pause() -> None:
    try:
        input(f"\n{Fore.YELLOW}Press Enter to return to the main menu...{Style.RESET_ALL}")
    except EOFError:
        print()


def clear_screen() -> None:
    if sys.platform == "win32":
        import os

        os.system("cls")
    else:
        print("\033[2J\033[H", end="")


def print_table(headers: list[str], rows: list[list[str]], highlights: set[int] | None = None) -> None:
    highlights = highlights or set()
    col_widths = [len(h) for h in headers]
    for row in rows:
        for i, cell in enumerate(row):
            col_widths[i] = max(col_widths[i], len(cell))

    def fmt_row(cells: list[str], header: bool = False) -> str:
        parts = []
        for i, cell in enumerate(cells):
            parts.append(cell.ljust(col_widths[i]))
        line = "  ".join(parts)
        return line

    print(fmt_row(headers, header=True))
    print(RULE_CHAR * min(100, sum(col_widths) + 2 * (len(headers) - 1)))
    for idx, row in enumerate(rows):
        line = fmt_row(row)
        if idx in highlights:
            print(f"{Fore.CYAN}{line}{Style.RESET_ALL}")
        else:
            print(line)


def copy_report_figures(src_dir: Path, dest_dir: Path, mapping: dict[str, str]) -> list[Path]:
    dest_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for dest_name, src_name in mapping.items():
        src = src_dir / src_name
        if not src.is_file():
            continue
        dest = dest_dir / dest_name
        shutil.copy2(src, dest)
        written.append(dest)
    return written


def open_results_folder(path: Path) -> None:
    if not path.is_dir():
        return
    try:
        if sys.platform == "win32":
            import os

            os.startfile(path)  # type: ignore[attr-defined]
        elif sys.platform == "darwin":
            import subprocess

            subprocess.run(["open", str(path)], check=False)
        else:
            import subprocess

            subprocess.run(["xdg-open", str(path)], check=False)
    except OSError:
        info(f"Results folder: {path}")
