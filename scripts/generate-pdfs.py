#!/usr/bin/env python3
"""
Breeze Outreach Kit & Deck PDF Generator — Final Version
Photo backgrounds, professional fonts, hardware company aesthetics.
  1. Portrait A4 outreach kit (9 pages)
  2. Landscape 16:9 pitch deck (9 slides)
"""

import os
import random
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import Color, HexColor, white
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# --- Font Registration (unify with website: Inter body + JetBrains Mono for data) ---
_FONT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "fonts")

def _register_fonts():
    """Register Inter + JetBrains Mono. Falls back to Helvetica if font files missing."""
    try:
        pdfmetrics.registerFont(TTFont("Inter", os.path.join(_FONT_DIR, "Inter-Regular.ttf")))
        pdfmetrics.registerFont(TTFont("Inter-Bold", os.path.join(_FONT_DIR, "Inter-Bold.ttf")))
        pdfmetrics.registerFont(TTFont("Inter-Medium", os.path.join(_FONT_DIR, "Inter-Medium.ttf")))
        pdfmetrics.registerFont(TTFont("Inter-SemiBold", os.path.join(_FONT_DIR, "Inter-SemiBold.ttf")))
        pdfmetrics.registerFont(TTFont("JetBrainsMono", os.path.join(_FONT_DIR, "JetBrainsMonoNerdFontMono-Regular.ttf")))
        return ("Inter", "Inter-Bold", "JetBrainsMono")
    except Exception as e:
        print(f"[warn] Font registration failed ({e}); falling back to Helvetica")
        return ("Helvetica", "Helvetica-Bold", "Courier")

SANS, SANS_BOLD, MONO = _register_fonts()

# --- Brand Colors ---
TEAL = HexColor("#2DD4A8")
NAVY = HexColor("#1B3A5C")
DEEP_NAVY = HexColor("#0F2440")
LIGHT_TEAL = HexColor("#E6FBF5")
SLATE = HexColor("#64748B")
WHITE = white

TEAL_R, TEAL_G, TEAL_B = 0x2D/255, 0xD4/255, 0xA8/255
NAVY_R, NAVY_G, NAVY_B = 0x1B/255, 0x3A/255, 0x5C/255
DEEP_R, DEEP_G, DEEP_B = 0x0F/255, 0x24/255, 0x40/255

# --- Paths ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO_LIGHT = os.path.join(BASE_DIR, "public", "breeze-logo.png")
LOGO_WHITE = os.path.join(BASE_DIR, "public", "breeze-logo-white.png")
PHOTO_PCB = os.path.join(BASE_DIR, "assets", "photos", "pcb-closeup.jpg")
PHOTO_CIRCUIT = os.path.join(BASE_DIR, "assets", "photos", "circuit-board.jpg")
PHOTO_COMPONENTS = os.path.join(BASE_DIR, "assets", "photos", "components.jpg")
OUT_KIT = os.path.join(BASE_DIR, "public", "breeze-outreach-kit.pdf")
OUT_DECK = os.path.join(BASE_DIR, "public", "breeze-deck.pdf")
DOWNLOADS = os.path.expanduser("~/Downloads")

# --- Content Data ---
PAIN_POINTS = [
    ("Factories won't take your 1K MOQ",
     "Most factories want 10K+ units. We start at 1,000."),
    ("Unpredictable NRE costs",
     "You get a clear, fixed NRE quote before any work starts."),
    ("IP leaks and design theft",
     "NDA + IP assignment standard on every engagement. Your designs stay yours."),
    ("Language and timezone barriers",
     "Native English + Mandarin team. We work your hours."),
    ("No DFM feedback until late",
     "We run DFM checks at the design stage, not after you've committed to tooling."),
    ("Certification maze",
     "FCC, CE, UL, SRRC -- we handle the paperwork, testing, and timeline."),
]

STEPS = [
    ("01", "Scoping",
     "Share your concept. We assess feasibility, BOM, and ballpark cost."),
    ("02", "Engineering Design",
     "Schematic, PCB layout, mechanical design, firmware architecture."),
    ("03", "DFM & Prototyping",
     "Optimize for manufacturability. 3-5 functional prototypes."),
    ("04", "Tooling & Sourcing",
     "Injection molds, jigs, fixtures. Component sourcing from 3,000+ local suppliers."),
    ("05", "Pilot Run",
     "50-500 units. Test assembly line, QC process, packaging."),
    ("06", "Mass Production",
     "Scale to 1K, 10K, 100K+. Ongoing QC, logistics, fulfillment."),
]

BOM_TABLE = [
    ["Component", "Example", "Cost Range"],
    ["SoC / MCU", "ESP32-S3 / nRF5340", "$1.80 - $4.50"],
    ["Memory (Flash + RAM)", "4MB + 512KB", "$0.60 - $1.20"],
    ["Microphone Array", "MEMS x2", "$0.80 - $2.00"],
    ["Speaker / Haptic", "Micro speaker + LRA", "$0.50 - $1.50"],
    ["Battery (LiPo)", "250mAh pouch cell", "$1.20 - $2.50"],
    ["BLE + Wi-Fi Antenna", "Chip antenna / FPC", "$0.30 - $0.80"],
    ["PCB (4-layer HDI)", "30x25mm, ENIG finish", "$0.80 - $1.50"],
    ["Enclosure (injection)", "PC/ABS, 2-shot mold", "$0.60 - $1.20"],
    ["Connector + Misc", "USB-C, pogo pins, ESD", "$0.40 - $0.80"],
    ["PCBA Assembly", "SMT + manual + test", "$1.50 - $3.00"],
    ["Packaging", "Box, insert, manual, cable", "$0.60 - $1.20"],
    ["TOTAL (@ 5K units)", "", "$9.10 - $20.20"],
    ["Landed Unit Cost*", "", "$26.40 avg"],
]

DFM_PITFALLS = [
    ("Thermal runaway", "AI inference chips generate 2-5W. Without proper thermal paths, throttling kills performance."),
    ("Antenna detuning", "The human body and enclosure materials shift antenna performance 3-6 dBm. Simulate with real enclosure."),
    ("Battery certification gap", "UN38.3 + IEC 62133 are mandatory for shipping. Budget 6-8 weeks and $3-5K."),
    ("Underspec'd power supply", "Peak current draw during AI inference can be 3x idle. Size your regulator for bursts."),
    ("Acoustic cavity design", "Mic array performance depends on cavity geometry, not just microphone specs."),
    ("Injection mold draft angles", "Below 1.5 degrees on textured surfaces = stuck parts and scratched finish."),
    ("Test jig as afterthought", "Design the test fixture alongside the product. Retrofitting costs 3x and delays 4 weeks."),
    ("Connector placement", "USB-C orientation and position affect waterproofing, drop strength, and user ergonomics."),
    ("ESD protection gaps", "Every external port needs TVS diodes. Skipping them passes lab testing but fails in the field."),
    ("Silkscreen and markings", "FCC ID, CE mark, and recycling symbols need specific sizes and placements per regulation."),
]

CERTIFICATIONS = [
    ["Certification", "Region", "Timeline", "Budget", "Required For"],
    ["FCC Part 15", "United States", "4-6 weeks", "$3-8K", "Any radio transmitter (BLE, Wi-Fi)"],
    ["CE (RED)", "European Union", "6-8 weeks", "$5-12K", "Radio equipment sold in EU/EFTA"],
    ["UL/IEC 62368", "US / Global", "8-12 weeks", "$8-15K", "Audio/video/IT equipment safety"],
    ["UN38.3", "Global", "4-6 weeks", "$3-5K", "Any product with lithium battery"],
    ["IC (ISED)", "Canada", "4-6 weeks", "$2-4K", "Radio devices sold in Canada"],
    ["SRRC + CCC", "China", "8-16 weeks", "$5-10K", "Radio + safety for China market"],
    ["MIC (Giteki)", "Japan", "6-10 weeks", "$4-8K", "Radio equipment sold in Japan"],
]

FREE_TOOLS = [
    ("BOM Cost Estimator",
     "Input your specs, get a manufacturing cost ballpark in 60 seconds. Covers SoC, memory, sensors, battery, PCB, enclosure, and assembly.",
     "breezehw.com/tools/bom-estimator"),
    ("DFM Checklist",
     "30-point design-for-manufacturability check covering thermal, mechanical, electrical, and certification pitfalls specific to AI hardware.",
     "breezehw.com/tools/dfm-checklist"),
    ("NRE Quote Simulator",
     "Estimate your total development cost: engineering hours, tooling, prototyping, certification, and project management.",
     "breezehw.com/tools/nre-simulator"),
    ("Certification Navigator",
     "FCC, CE, UL, SRRC, UN38.3 -- which do you need? Get a timeline, cost estimate, and testing lab recommendations.",
     "breezehw.com/tools/cert-navigator"),
]

DIFFERENTIATORS = [
    ("Whole Product, Not Just Parts",
     "We build the full device -- electronics, enclosure, firmware, packaging. One team, one responsibility, one timeline."),
    ("No Equity, No Surprises",
     "NRE + per-unit pricing. Pure service model. We don't take a piece of your company. Period."),
    ("Your IP Stays Yours",
     "NDA + IP assignment is standard on every engagement. You receive full source files, schematics, and manufacturing data."),
    ("AI Hardware Native",
     "We understand edge AI thermal management, antenna design for wearables, battery optimization, and low-power ML inference."),
]

STATS = [
    ("3,000+", "Component suppliers"),
    ("12 weeks", "Concept to prototype"),
    ("1,000", "Min pilot run"),
]


# =====================================================================
# Drawing Helpers
# =====================================================================

def draw_photo_bg(c, photo_path, page_w, page_h, overlay_alpha=0.75):
    """Draw a full-bleed photo with navy overlay."""
    c.drawImage(photo_path, 0, 0, width=page_w, height=page_h,
                preserveAspectRatio=False)
    c.setFillColor(Color(DEEP_R, DEEP_G, DEEP_B, alpha=overlay_alpha))
    c.rect(0, 0, page_w, page_h, fill=True, stroke=False)


def draw_photo_strip(c, photo_path, page_w, page_h, strip_h=120):
    """Draw a photo strip at the top of the page with dark overlay."""
    c.drawImage(photo_path, 0, page_h - strip_h, width=page_w, height=strip_h,
                preserveAspectRatio=False)
    c.setFillColor(Color(0, 0, 0, alpha=0.50))
    c.rect(0, page_h - strip_h, page_w, strip_h, fill=True, stroke=False)


def draw_circuit_traces(c, x0, y0, width, height, opacity=0.10, density=12, seed=42):
    """Draw PCB-style circuit traces as background decoration on white pages."""
    rng = random.Random(seed)
    c.saveState()
    c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, opacity))
    c.setLineWidth(0.4)

    cell_w = width / density
    cell_h = height / density

    for i in range(density + 1):
        y = y0 + i * cell_h
        seg_start = x0
        for j in range(density):
            x = x0 + j * cell_w
            if rng.random() < 0.35:
                c.line(seg_start, y, x + cell_w, y)
                if rng.random() < 0.4:
                    c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, opacity))
                    c.circle(x + cell_w, y, 1.2, fill=1, stroke=0)
            else:
                seg_start = x + cell_w

        x = x0 + i * cell_w
        seg_start = y0
        for j in range(density):
            y = y0 + j * cell_h
            if rng.random() < 0.30:
                c.line(x, seg_start, x, y + cell_h)
                if rng.random() < 0.4:
                    c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, opacity))
                    c.circle(x, y + cell_h, 1.2, fill=1, stroke=0)
            else:
                seg_start = y + cell_h

    for _ in range(int(density * 1.5)):
        cx = x0 + rng.random() * width
        cy = y0 + rng.random() * height
        seg = rng.uniform(10, 40)
        direction = rng.choice([(1, 0, 0, 1), (1, 0, 0, -1), (-1, 0, 0, 1), (-1, 0, 0, -1)])
        dx1, dy1, dx2, dy2 = direction
        c.line(cx, cy, cx + dx1 * seg, cy + dy1 * seg)
        c.line(cx + dx1 * seg, cy + dy1 * seg,
               cx + dx1 * seg + dx2 * seg * 0.6, cy + dy1 * seg + dy2 * seg * 0.6)
        c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, opacity * 1.3))
        c.circle(cx + dx1 * seg, cy + dy1 * seg, 1.5, fill=1, stroke=0)

    c.restoreState()


def draw_stat_callout(c, x, y, w, h, value_text, label_text, font_size_val=18, font_size_label=8):
    """Draw a rounded stat callout box with teal background."""
    c.saveState()
    c.setFillColor(TEAL)
    c.roundRect(x, y, w, h, 6, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, font_size_val)
    c.drawCentredString(x + w/2, y + h - font_size_val - 8, value_text)
    c.setFont(SANS, font_size_label)
    c.drawCentredString(x + w/2, y + 8, label_text)
    c.restoreState()


def draw_footer(c, page_width, page_num, footer_y=25, font_size=8, text_color=None):
    """Draw consistent footer with teal line, URL, and page number."""
    c.saveState()
    color = text_color or SLATE
    c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.4))
    c.setLineWidth(0.5)
    c.line(50, footer_y + 12, page_width - 50, footer_y + 12)
    c.setFillColor(color)
    c.setFont(SANS, font_size)
    c.drawString(50, footer_y, "breezehw.com")
    c.drawRightString(page_width - 50, footer_y, str(page_num))
    c.restoreState()


def draw_accent_bar(c, page_width, page_height, variant="left"):
    """Draw a teal accent bar on the left side or top."""
    c.saveState()
    c.setFillColor(TEAL)
    if variant == "left":
        c.rect(0, 0, 3 * mm, page_height, fill=1, stroke=0)
    elif variant == "top":
        c.rect(0, page_height - 2 * mm, page_width, 2 * mm, fill=1, stroke=0)
    c.restoreState()


def wrap_text(c, text, font_name, font_size, max_width):
    """Word-wrap text and return list of lines."""
    words = text.split()
    lines = []
    line = ""
    for w in words:
        test = line + " " + w if line else w
        if c.stringWidth(test, font_name, font_size) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


# =====================================================================
# PORTRAIT A4 OUTREACH KIT  (595 x 842 pt)
# =====================================================================

def generate_portrait_kit():
    """Generate the A4 portrait outreach kit PDF with photo backgrounds."""
    W, H = A4  # 595 x 842
    MARGIN = 50
    CW = W - 2 * MARGIN

    c = canvas.Canvas(OUT_KIT, pagesize=A4)
    c.setTitle("Breeze - AI Hardware Engineering Partner")
    c.setAuthor("Breeze")

    page_num = [0]

    def new_white_page(accent="left"):
        """Start a new white page with circuit traces and accent bar."""
        c.showPage()
        page_num[0] += 1
        draw_accent_bar(c, W, H, accent)
        draw_circuit_traces(c, 0, 0, W, H, opacity=0.06, density=14, seed=page_num[0] * 17)
        draw_footer(c, W, page_num[0])

    def new_strip_page(photo_path, accent="top"):
        """Start a new page with photo strip at top, white below."""
        c.showPage()
        page_num[0] += 1
        draw_circuit_traces(c, 0, 0, W, H - 120, opacity=0.06, density=14, seed=page_num[0] * 17)
        draw_photo_strip(c, photo_path, W, H, strip_h=120)
        draw_accent_bar(c, W, H, accent)
        draw_footer(c, W, page_num[0])

    # =================================================================
    # PAGE 1: COVER  --  pcb-closeup.jpg FULL BLEED + navy 75% overlay
    # =================================================================
    page_num[0] = 1
    draw_photo_bg(c, PHOTO_PCB, W, H, overlay_alpha=0.75)

    # Logo
    logo_w = 220
    logo_h = logo_w * 202 / 1168
    c.drawImage(LOGO_WHITE, W/2 - logo_w/2, H - 230, logo_w, logo_h, mask='auto')

    # Tagline
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 30)
    c.drawCentredString(W/2, H - 320, "Your Engineering Partner")
    c.setFillColor(TEAL)
    c.setFont(SANS_BOLD, 30)
    c.drawCentredString(W/2, H - 358, "for AI Hardware")

    # Subtitle
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.setFont(SANS, 12)
    c.drawCentredString(W/2, H - 400, "From concept to production -- BOM optimization, DFM,")
    c.drawCentredString(W/2, H - 416, "prototyping, and manufacturing. China supply chain")
    c.drawCentredString(W/2, H - 432, "expertise, global delivery.")

    # Stats row
    stat_w = 145
    stat_h = 60
    stat_gap = 20
    total_stats_w = 3 * stat_w + 2 * stat_gap
    stat_x_start = W/2 - total_stats_w/2
    stat_y = H - 540
    for i, (val, lbl) in enumerate(STATS):
        sx = stat_x_start + i * (stat_w + stat_gap)
        draw_stat_callout(c, sx, stat_y, stat_w, stat_h, val, lbl,
                          font_size_val=20, font_size_label=9)

    # Contact
    c.setFillColor(Color(1, 1, 1, 0.5))
    c.setFont(SANS, 10)
    c.drawCentredString(W/2, 90, "hello@breezehw.com  |  breezehw.com  |  Shenzhen, China")
    c.setFont(SANS, 9)
    c.setFillColor(Color(1, 1, 1, 0.35))
    c.drawCentredString(W/2, 70, "No equity. No MOQ surprises. Just engineering.")

    # =================================================================
    # PAGE 2: THE PROBLEM  --  white background, no photo
    # =================================================================
    new_white_page("left")
    y = H - MARGIN

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 30)
    y -= 35
    c.drawString(MARGIN, y, "Building AI Hardware Is Hard.")
    c.setFillColor(SLATE)
    c.setFont(SANS, 13)
    y -= 22
    c.drawString(MARGIN, y, "Finding the right manufacturing partner shouldn't be.")

    # 80% callout
    y -= 60
    callout_h = 50
    c.setFillColor(Color(DEEP_R, DEEP_G, DEEP_B, 0.95))
    c.roundRect(MARGIN, y, CW, callout_h, 6, fill=1, stroke=0)
    c.setFillColor(TEAL)
    c.setFont(SANS_BOLD, 24)
    c.drawString(MARGIN + 18, y + 15, "80%")
    c.setFillColor(WHITE)
    c.setFont(SANS, 13)
    c.drawString(MARGIN + 70, y + 17, "of hardware startups fail at the manufacturing stage.")

    # 2x3 pain point grid
    y -= 35
    col_w = CW / 2 - 10
    for idx, (title, desc) in enumerate(PAIN_POINTS):
        col = idx % 2
        row = idx // 2
        px = MARGIN + col * (col_w + 20)
        py = y - row * 120

        c.setFillColor(Color(0.97, 0.97, 0.97, 1))
        c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.15))
        c.setLineWidth(0.5)
        c.roundRect(px, py - 70, col_w, 95, 5, fill=1, stroke=1)

        c.setFillColor(HexColor("#EF4444"))
        c.circle(px + 16, py + 8, 6, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 8)
        c.drawCentredString(px + 16, py + 5, "X")

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 12)
        c.drawString(px + 30, py + 3, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 11)
        lines = wrap_text(c, desc, SANS, 11, col_w - 24)
        ty = py - 18
        for ln in lines:
            c.drawString(px + 14, ty, ln)
            ty -= 15

    # =================================================================
    # PAGE 3: 6-STEP PROCESS  --  pcb strip top + white body
    # =================================================================
    new_strip_page(PHOTO_PCB)

    # Title reversed out in the photo strip
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 22)
    c.drawString(MARGIN, H - 50, "Concept to Production in 6 Steps")
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.setFont(SANS, 12)
    c.drawString(MARGIN, H - 70, "A clear, predictable path from your idea to manufactured product.")

    y = H - 155

    for idx, (num, title, desc) in enumerate(STEPS):
        row = idx // 2
        col = idx % 2
        bx = MARGIN + col * (CW/2 + 5)
        by = y - row * 140

        c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.15))
        c.setFont(SANS_BOLD, 44)
        c.drawString(bx, by - 10, num)

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 14)
        c.drawString(bx + 72, by + 4, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 11)
        lines = wrap_text(c, desc, SANS, 11, CW/2 - 80)
        ty = by - 18
        for ln in lines:
            c.drawString(bx + 72, ty, ln)
            ty -= 15

    # Bottom stats bar
    y_stats = y - 3 * 140 - 15
    stat_items = [("12 weeks", "Avg concept-to-prototype"), ("$26.40/unit", "AI pendant example"), ("50-500", "Pilot run units")]
    sw = (CW - 30) / 3
    for i, (val, lbl) in enumerate(stat_items):
        draw_stat_callout(c, MARGIN + i * (sw + 15), y_stats, sw, 52, val, lbl,
                          font_size_val=18, font_size_label=8)

    # =================================================================
    # PAGE 4: COST REALITY CHECK  --  white background + BOM table
    # =================================================================
    new_white_page("left")
    y = H - MARGIN

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 30)
    y -= 35
    c.drawString(MARGIN, y, "Cost Reality Check")
    c.setFillColor(SLATE)
    c.setFont(SANS, 13)
    y -= 20
    c.drawString(MARGIN, y, "Real BOM breakdown for a $99 AI wearable pendant (@ 5K units)")

    # $26.40 callout
    y -= 55
    c.setFillColor(TEAL)
    c.roundRect(MARGIN, y, CW, 44, 6, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(MONO, 22)
    c.drawString(MARGIN + 20, y + 13, "$26.40 / unit")
    c.setFont(SANS, 11)
    c.drawRightString(MARGIN + CW - 20, y + 17, "avg landed cost (incl. assembly + packaging)")

    # BOM table
    y -= 22
    row_h = 25
    col_widths = [CW * 0.35, CW * 0.35, CW * 0.30]

    for ridx, row_data in enumerate(BOM_TABLE):
        ry = y - ridx * row_h

        if ridx == 0:
            c.setFillColor(NAVY)
            c.roundRect(MARGIN, ry - 5, CW, row_h, 3, fill=1, stroke=0)
            c.setFillColor(WHITE)
            header_font = SANS_BOLD
            data_font = SANS_BOLD
        elif ridx == len(BOM_TABLE) - 1:
            c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.12))
            c.rect(MARGIN, ry - 5, CW, row_h, fill=1, stroke=0)
            c.setFillColor(NAVY)
            header_font = SANS_BOLD
            data_font = SANS_BOLD
        elif ridx == len(BOM_TABLE) - 2:
            c.setFillColor(Color(0.95, 0.95, 0.95, 1))
            c.rect(MARGIN, ry - 5, CW, row_h, fill=1, stroke=0)
            c.setFillColor(NAVY)
            header_font = SANS_BOLD
            data_font = SANS_BOLD
        else:
            if ridx % 2 == 0:
                c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.04))
                c.rect(MARGIN, ry - 5, CW, row_h, fill=1, stroke=0)
            c.setFillColor(NAVY if ridx % 2 == 0 else HexColor("#334155"))
            header_font = SANS
            data_font = SANS

        cx = MARGIN + 8
        for cidx, cell in enumerate(row_data):
            # Last column = cost range — monospace for price alignment
            if cidx == 2 and ridx != 0:
                c.setFont(MONO, 10)
            else:
                c.setFont(header_font if cidx == 0 else data_font, 10)
            c.drawString(cx, ry + 4, cell)
            cx += col_widths[cidx]

    y -= len(BOM_TABLE) * row_h + 15
    c.setFillColor(SLATE)
    c.setFont(SANS, 8)
    c.drawString(MARGIN, y, "* Landed cost includes BOM + PCBA + packaging + testing + 5% yield buffer + freight to US warehouse.")
    y -= 14
    c.drawString(MARGIN, y, "  Excludes NRE (one-time engineering), tooling amortization, and certification fees.")

    # =================================================================
    # PAGE 5: DFM TOP 10 PITFALLS  --  circuit-board strip top + white body
    # =================================================================
    new_strip_page(PHOTO_CIRCUIT)

    # Title reversed out in photo strip
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 22)
    c.drawString(MARGIN, H - 50, "DFM: Top 10 Pitfalls in AI Hardware")
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.setFont(SANS, 12)
    c.drawString(MARGIN, H - 70, "Mistakes we've seen (and fixed) across 50+ hardware projects.")

    y = H - 140

    for idx, (title, desc) in enumerate(DFM_PITFALLS):
        c.setFillColor(TEAL if idx < 5 else Color(TEAL_R, TEAL_G, TEAL_B, 0.7))
        c.circle(MARGIN + 12, y + 2, 11, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 10)
        c.drawCentredString(MARGIN + 12, y - 1, str(idx + 1))

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 12)
        c.drawString(MARGIN + 30, y - 1, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 11)
        lines = wrap_text(c, desc, SANS, 11, CW - 40)
        ty = y - 17
        for ln in lines:
            c.drawString(MARGIN + 30, ty, ln)
            ty -= 14

        y -= 62
        if idx == 4:
            y -= 6

    # =================================================================
    # PAGE 6: CERTIFICATION ROADMAP  --  white background
    # =================================================================
    new_white_page("left")
    y = H - MARGIN

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 30)
    y -= 35
    c.drawString(MARGIN, y, "Certification Roadmap")
    c.setFillColor(SLATE)
    c.setFont(SANS, 13)
    y -= 22
    c.drawString(MARGIN, y, "What you need, how long it takes, and what it costs.")

    y -= 35
    cert_col_widths = [CW * 0.18, CW * 0.15, CW * 0.14, CW * 0.13, CW * 0.40]
    row_h = 30

    for ridx, row_data in enumerate(CERTIFICATIONS):
        ry = y - ridx * row_h

        if ridx == 0:
            c.setFillColor(NAVY)
            c.roundRect(MARGIN, ry - 6, CW, row_h, 3, fill=1, stroke=0)
            c.setFillColor(WHITE)
            c.setFont(SANS_BOLD, 10)
        else:
            if ridx % 2 == 0:
                c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.04))
                c.rect(MARGIN, ry - 6, CW, row_h, fill=1, stroke=0)
            c.setFillColor(NAVY)
            c.setFont(SANS, 10)

        c.setStrokeColor(Color(0.9, 0.9, 0.9, 1))
        c.setLineWidth(0.3)
        c.line(MARGIN, ry - 6, MARGIN + CW, ry - 6)

        cx = MARGIN + 6
        for cidx, cell in enumerate(row_data):
            max_cell_w = cert_col_widths[cidx] - 8
            text = cell
            font = SANS_BOLD if ridx == 0 else SANS
            fsize = 10
            while c.stringWidth(text, font, fsize) > max_cell_w and len(text) > 3:
                text = text[:-4] + "..."
            c.drawString(cx, ry + 4, text)
            cx += cert_col_widths[cidx]

    y -= len(CERTIFICATIONS) * row_h + 30

    # Pro Tip box
    tip_h = 70
    c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.08))
    c.setStrokeColor(TEAL)
    c.setLineWidth(1)
    c.roundRect(MARGIN, y - tip_h + 20, CW, tip_h, 5, fill=1, stroke=1)
    c.setFillColor(TEAL)
    c.setFont(SANS_BOLD, 12)
    c.drawString(MARGIN + 14, y + 4, "Pro Tip")
    c.setFillColor(NAVY)
    c.setFont(SANS, 11)
    c.drawString(MARGIN + 14, y - 14, "Start certification pre-compliance testing during the DFM phase.")
    c.drawString(MARGIN + 14, y - 29, "Finding issues early saves 4-8 weeks and $5-10K in re-spins.")
    c.drawString(MARGIN + 14, y - 44, "We include pre-compliance checks in our standard engineering process.")

    # =================================================================
    # PAGE 7: FREE TOOLS  --  white background
    # =================================================================
    new_white_page("top")
    y = H - MARGIN

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 30)
    y -= 35
    c.drawString(MARGIN, y, "Free Tools for AI Hardware Founders")
    c.setFillColor(SLATE)
    c.setFont(SANS, 13)
    y -= 22
    c.drawString(MARGIN, y, "No signup required. Start estimating your project now.")

    y -= 40

    for idx, (title, desc, url) in enumerate(FREE_TOOLS):
        card_h = 115
        card_y = y - card_h

        c.setFillColor(Color(0.98, 0.98, 0.98, 1))
        c.setStrokeColor(Color(0.92, 0.92, 0.92, 1))
        c.setLineWidth(0.5)
        c.roundRect(MARGIN, card_y, CW, card_h, 5, fill=1, stroke=1)
        c.setFillColor(TEAL)
        c.rect(MARGIN, card_y, 4, card_h, fill=1, stroke=0)

        c.setFillColor(TEAL)
        c.circle(MARGIN + 28, card_y + card_h - 25, 14, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 14)
        c.drawCentredString(MARGIN + 28, card_y + card_h - 30, str(idx + 1))

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 14)
        c.drawString(MARGIN + 52, card_y + card_h - 28, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 11)
        lines = wrap_text(c, desc, SANS, 11, CW - 65)
        ty = card_y + card_h - 50
        for ln in lines:
            c.drawString(MARGIN + 22, ty, ln)
            ty -= 15

        c.setFillColor(TEAL)
        c.setFont(SANS_BOLD, 10)
        c.drawString(MARGIN + 22, card_y + 12, url)

        y -= card_h + 15

    # =================================================================
    # PAGE 8: WHY BREEZE  --  pcb-closeup FULL BLEED + navy 80% overlay
    # =================================================================
    c.showPage()
    page_num[0] += 1
    draw_photo_bg(c, PHOTO_PCB, W, H, overlay_alpha=0.80)
    draw_footer(c, W, page_num[0], text_color=Color(1, 1, 1, 0.5))

    y = H - MARGIN

    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 30)
    y -= 35
    c.drawString(MARGIN, y, "Why Breeze?")
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.setFont(SANS, 14)
    y -= 22
    c.drawString(MARGIN, y, "Four reasons founders choose us over brokers and trading companies.")

    y -= 45
    card_h = 100
    for idx, (title, desc) in enumerate(DIFFERENTIATORS):
        col = idx % 2
        row = idx // 2
        bx = MARGIN + col * (CW/2 + 10)
        by = y - card_h - row * (card_h + 22)
        bw = CW/2 - 10

        # Teal semi-transparent box
        c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.20))
        c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.5))
        c.setLineWidth(0.5)
        c.roundRect(bx, by, bw, card_h, 5, fill=1, stroke=1)

        c.setFillColor(TEAL)
        c.rect(bx + 5, by + card_h - 3, bw - 10, 3, fill=1, stroke=0)

        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 13)
        c.drawString(bx + 15, by + card_h - 25, title)

        c.setFillColor(Color(1, 1, 1, 0.85))
        c.setFont(SANS, 11)
        lines = wrap_text(c, desc, SANS, 11, bw - 30)
        ty = by + card_h - 44
        for ln in lines:
            c.drawString(bx + 15, ty, ln)
            ty -= 14

    # Bottom comparison bar
    y -= 2 * (card_h + 22) + 50
    c.setFillColor(Color(0, 0, 0, 0.3))
    c.roundRect(MARGIN, y - 5, CW, 60, 5, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 12)
    c.drawString(MARGIN + 18, y + 35, "Breeze vs. the alternatives:")
    c.setFont(SANS, 11)
    c.setFillColor(Color(1, 1, 1, 0.85))
    c.drawString(MARGIN + 18, y + 17, "Trading companies add 20-40% margin and zero engineering value.")
    c.drawString(MARGIN + 18, y + 1, "In-house teams cost $500K+/year and take 6+ months to hire. We're ready now.")

    # =================================================================
    # PAGE 9: NEXT STEPS / CONTACT  --  navy solid background
    # =================================================================
    c.showPage()
    page_num[0] += 1
    c.setFillColor(DEEP_NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    draw_circuit_traces(c, 0, 0, W, H, opacity=0.08, density=14, seed=999)

    # Teal accent elements
    c.setFillColor(TEAL)
    c.rect(0, H - 4, W, 4, fill=1, stroke=0)  # top bar
    c.rect(W/2 - 40, H - 100, 80, 3, fill=1, stroke=0)  # divider

    draw_footer(c, W, page_num[0], text_color=Color(1, 1, 1, 0.4))

    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 30)
    c.drawCentredString(W/2, H - 80, "Ready to Start?")

    y = H - 140

    next_steps = [
        ("1", "Try Our Free Tools", "Get a BOM estimate and DFM checklist at breezehw.com/tools. No signup required."),
        ("2", "Book a Scoping Call", "30 minutes. Share your concept, we assess feasibility and provide a ballpark cost range."),
        ("3", "Receive Your NRE Proposal", "Detailed engineering plan with fixed pricing, timeline, and deliverables. No surprises."),
        ("4", "Start Building", "We assign your dedicated engineering team and begin the 12-week path to prototype."),
    ]

    for idx, (num, title, desc) in enumerate(next_steps):
        box_h = 65
        box_y = y - box_h

        c.setFillColor(TEAL)
        c.circle(MARGIN + 24, box_y + box_h/2 + 2, 18, fill=1, stroke=0)
        c.setFillColor(DEEP_NAVY)
        c.setFont(SANS_BOLD, 16)
        c.drawCentredString(MARGIN + 24, box_y + box_h/2 - 4, num)

        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 14)
        c.drawString(MARGIN + 55, box_y + box_h - 18, title)

        c.setFillColor(Color(1, 1, 1, 0.7))
        c.setFont(SANS, 11)
        lines = wrap_text(c, desc, SANS, 11, CW - 70)
        ty = box_y + box_h - 38
        for ln in lines:
            c.drawString(MARGIN + 55, ty, ln)
            ty -= 15

        if idx < 3:
            c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.3))
            c.setLineWidth(1)
            c.setDash(4, 4)
            c.line(MARGIN + 24, box_y - 3, MARGIN + 24, box_y - 15)
            c.setDash()

        y -= box_h + 20

    # Contact card
    y -= 10
    card_h = 100
    c.setFillColor(Color(1, 1, 1, 0.06))
    c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.3))
    c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - card_h + 30, CW, card_h, 8, fill=1, stroke=1)

    mini_logo_w = 130
    mini_logo_h = mini_logo_w * 202 / 1168
    c.drawImage(LOGO_WHITE, MARGIN + 20, y - 5, mini_logo_w, mini_logo_h, mask='auto')

    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 12)
    c.drawString(MARGIN + 20, y - 30, "hello@breezehw.com")
    c.setFont(SANS, 11)
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.drawString(MARGIN + 20, y - 48, "breezehw.com")
    c.drawString(MARGIN + 20, y - 64, "Shenzhen, China")

    c.setFillColor(TEAL)
    c.setFont(SANS_BOLD, 11)
    c.drawRightString(MARGIN + CW - 20, y - 30, "Your Engineering Partner for AI Hardware")
    c.setFillColor(Color(1, 1, 1, 0.5))
    c.setFont(SANS, 10)
    c.drawRightString(MARGIN + CW - 20, y - 48, "NRE + per-unit  |  No equity  |  Full IP transfer")

    c.save()
    print(f"Portrait kit saved: {OUT_KIT}")


# =====================================================================
# LANDSCAPE 16:9 DECK  (960 x 540 pt)
# =====================================================================

def generate_landscape_deck():
    """Generate the 16:9 landscape pitch deck PDF with photo backgrounds."""
    W, H = 960, 540
    M = 50
    CW = W - 2 * M

    c = canvas.Canvas(OUT_DECK, pagesize=(W, H))
    c.setTitle("Breeze - AI Hardware Pitch Deck")
    c.setAuthor("Breeze")

    page_num = [0]

    def new_white_slide(accent="left"):
        """White slide with circuit traces."""
        if page_num[0] > 0:
            c.showPage()
        page_num[0] += 1
        draw_circuit_traces(c, 0, 0, W, H, opacity=0.06, density=10, seed=page_num[0] * 23)
        draw_accent_bar(c, W, H, accent)
        if page_num[0] > 1:
            draw_footer(c, W, page_num[0] - 1, footer_y=15, font_size=10)

    def new_strip_slide(photo_path, accent="top"):
        """Slide with photo strip at top, white below."""
        if page_num[0] > 0:
            c.showPage()
        page_num[0] += 1
        draw_circuit_traces(c, 0, 0, W, H - 100, opacity=0.06, density=10, seed=page_num[0] * 23)
        draw_photo_strip(c, photo_path, W, H, strip_h=100)
        draw_accent_bar(c, W, H, accent)
        if page_num[0] > 1:
            draw_footer(c, W, page_num[0] - 1, footer_y=15, font_size=10)

    # =================================================================
    # SLIDE 1: COVER  --  pcb-closeup FULL BLEED + navy 75%
    # =================================================================
    page_num[0] += 1
    draw_photo_bg(c, PHOTO_PCB, W, H, overlay_alpha=0.75)

    # Logo
    logo_w = 240
    logo_h = logo_w * 202 / 1168
    c.drawImage(LOGO_WHITE, W/2 - logo_w/2, H - 150, logo_w, logo_h, mask='auto')

    # Title
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 42)
    c.drawCentredString(W/2, H - 240, "Your Engineering Partner")
    c.setFillColor(TEAL)
    c.setFont(SANS_BOLD, 42)
    c.drawCentredString(W/2, H - 290, "for AI Hardware")

    # Subtitle
    c.setFillColor(Color(1, 1, 1, 0.65))
    c.setFont(SANS, 18)
    c.drawCentredString(W/2, H - 330, "BOM optimization  |  DFM  |  Prototyping  |  Manufacturing")

    # Stats row
    stat_w = 170
    stat_h = 55
    stat_gap = 25
    total_w = 3 * stat_w + 2 * stat_gap
    sx_start = W/2 - total_w/2
    for i, (val, lbl) in enumerate(STATS):
        draw_stat_callout(c, sx_start + i * (stat_w + stat_gap), 55, stat_w, stat_h, val, lbl,
                          font_size_val=22, font_size_label=10)

    c.setFillColor(Color(1, 1, 1, 0.4))
    c.setFont(SANS, 10)
    c.drawCentredString(W/2, 30, "hello@breezehw.com  |  breezehw.com  |  Shenzhen, China")

    # =================================================================
    # SLIDE 2: THE PROBLEM  --  white background
    # =================================================================
    new_white_slide("left")

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 42)
    c.drawString(M + 10, H - 65, "Building AI Hardware Is Hard.")

    # 80% callout
    c.setFillColor(Color(DEEP_R, DEEP_G, DEEP_B, 0.95))
    c.roundRect(M + 10, H - 115, CW - 10, 40, 5, fill=1, stroke=0)
    c.setFillColor(TEAL)
    c.setFont(SANS_BOLD, 24)
    c.drawString(M + 25, H - 106, "80%")
    c.setFillColor(WHITE)
    c.setFont(SANS, 14)
    c.drawString(M + 80, H - 104, "of hardware startups fail at manufacturing, not the idea stage.")

    y_start = H - 145
    col_w = (CW - 30) / 2
    for idx, (title, desc) in enumerate(PAIN_POINTS):
        col = idx % 2
        row = idx // 2
        px = M + 10 + col * (col_w + 20)
        py = y_start - row * 82

        c.setFillColor(HexColor("#EF4444"))
        c.circle(px + 10, py - 4, 6, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 8)
        c.drawCentredString(px + 10, py - 7, "X")

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 14)
        c.drawString(px + 22, py - 8, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 12)
        lines = wrap_text(c, desc, SANS, 12, col_w - 25)
        ty = py - 26
        for ln in lines:
            c.drawString(px + 14, ty, ln)
            ty -= 14

    # =================================================================
    # SLIDE 3: 6-STEP PROCESS  --  pcb strip top + white
    # =================================================================
    new_strip_slide(PHOTO_PCB)

    # Title in strip
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 32)
    c.drawString(M, H - 45, "Concept to Production in 6 Steps")
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.setFont(SANS, 14)
    c.drawString(M, H - 68, "A clear, predictable path from idea to product.")

    y_start = H - 125
    col_w = (CW - 40) / 3
    for idx, (num, title, desc) in enumerate(STEPS):
        col = idx % 3
        row = idx // 3
        bx = M + col * (col_w + 20)
        by = y_start - row * 195

        c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.15))
        c.setFont(SANS_BOLD, 42)
        c.drawString(bx, by - 10, num)

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 14)
        c.drawString(bx + 68, by, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 12)
        lines = wrap_text(c, desc, SANS, 12, col_w - 70)
        ty = by - 22
        for ln in lines:
            c.drawString(bx + 68, ty, ln)
            ty -= 15

    # =================================================================
    # SLIDE 4: COST REALITY CHECK  --  white background
    # =================================================================
    new_white_slide("left")

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 42)
    c.drawString(M + 10, H - 60, "Cost Reality Check")
    c.setFillColor(SLATE)
    c.setFont(SANS, 14)
    c.drawString(M + 10, H - 82, "$99 AI wearable pendant -- real BOM breakdown @ 5K units")

    # $26.40 callout
    c.setFillColor(TEAL)
    c.roundRect(M + 10, H - 118, 320, 30, 5, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(MONO, 18)
    c.drawString(M + 25, H - 112, "$26.40 / unit")
    c.setFont(SANS, 12)
    c.drawString(M + 195, H - 110, "avg landed cost")

    y = H - 135
    row_h = 22
    bom_short = BOM_TABLE[:12]
    bom_short.append(BOM_TABLE[-1])
    col_widths_deck = [CW * 0.30, CW * 0.35, CW * 0.35]

    for ridx, row_data in enumerate(bom_short):
        ry = y - ridx * row_h

        if ridx == 0:
            c.setFillColor(NAVY)
            c.roundRect(M + 10, ry - 4, CW - 20, row_h, 2, fill=1, stroke=0)
            c.setFillColor(WHITE)
            is_emphasis = True
        elif ridx == len(bom_short) - 1:
            c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.12))
            c.rect(M + 10, ry - 4, CW - 20, row_h, fill=1, stroke=0)
            c.setFillColor(NAVY)
            is_emphasis = True
        else:
            if ridx % 2 == 0:
                c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.03))
                c.rect(M + 10, ry - 4, CW - 20, row_h, fill=1, stroke=0)
            c.setFillColor(NAVY)
            is_emphasis = False

        cx = M + 18
        for cidx, cell in enumerate(row_data):
            if cidx == 2 and ridx != 0:
                c.setFont(MONO, 10)
            else:
                c.setFont(SANS_BOLD if is_emphasis else SANS, 10)
            c.drawString(cx, ry + 3, cell)
            cx += col_widths_deck[cidx]

    # =================================================================
    # SLIDE 5: DFM PITFALLS  --  circuit-board strip top + white
    # =================================================================
    new_strip_slide(PHOTO_CIRCUIT)

    # Title in strip
    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 32)
    c.drawString(M, H - 45, "DFM: Top 10 Pitfalls")
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.setFont(SANS, 14)
    c.drawString(M, H - 68, "Mistakes we've seen (and fixed) across 50+ hardware projects.")

    y = H - 125
    col_w = (CW - 25) / 2
    for idx, (title, desc) in enumerate(DFM_PITFALLS):
        col = idx % 2
        row = idx // 2
        px = M + col * (col_w + 25)
        py = y - row * 72

        c.setFillColor(TEAL)
        c.circle(px + 10, py - 2, 10, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 10)
        c.drawCentredString(px + 10, py - 5, str(idx + 1))

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 12)
        c.drawString(px + 26, py - 6, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 10)
        lines = wrap_text(c, desc, SANS, 10, col_w - 30)
        ty = py - 22
        for ln in lines:
            c.drawString(px + 16, ty, ln)
            ty -= 13

    # =================================================================
    # SLIDE 6: CERTIFICATIONS  --  white background
    # =================================================================
    new_white_slide("left")

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 42)
    c.drawString(M + 10, H - 60, "Certification Roadmap")
    c.setFillColor(SLATE)
    c.setFont(SANS, 14)
    c.drawString(M + 10, H - 82, "What you need, how long it takes, and what it costs.")

    y = H - 105
    cert_col_widths_deck = [CW * 0.17, CW * 0.14, CW * 0.13, CW * 0.12, CW * 0.44]
    row_h = 28

    for ridx, row_data in enumerate(CERTIFICATIONS):
        ry = y - ridx * row_h

        if ridx == 0:
            c.setFillColor(NAVY)
            c.roundRect(M + 10, ry - 5, CW - 20, row_h, 2, fill=1, stroke=0)
            c.setFillColor(WHITE)
            c.setFont(SANS_BOLD, 10)
        else:
            if ridx % 2 == 0:
                c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.04))
                c.rect(M + 10, ry - 5, CW - 20, row_h, fill=1, stroke=0)
            c.setFillColor(NAVY)
            c.setFont(SANS, 10)
            c.setStrokeColor(Color(0.9, 0.9, 0.9, 1))
            c.setLineWidth(0.2)
            c.line(M + 10, ry - 5, M + CW - 10, ry - 5)

        cx = M + 18
        for cidx, cell in enumerate(row_data):
            max_cw = cert_col_widths_deck[cidx] - 8
            text = cell
            font = SANS_BOLD if ridx == 0 else SANS
            fsize = 10
            while c.stringWidth(text, font, fsize) > max_cw and len(text) > 3:
                text = text[:-4] + "..."
            c.drawString(cx, ry + 4, text)
            cx += cert_col_widths_deck[cidx]

    tip_y = y - len(CERTIFICATIONS) * row_h - 15
    c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.08))
    c.setStrokeColor(TEAL)
    c.setLineWidth(0.8)
    c.roundRect(M + 10, tip_y, CW - 20, 40, 4, fill=1, stroke=1)
    c.setFillColor(TEAL)
    c.setFont(SANS_BOLD, 11)
    c.drawString(M + 25, tip_y + 22, "Pro Tip:")
    c.setFillColor(NAVY)
    c.setFont(SANS, 11)
    c.drawString(M + 85, tip_y + 22, "Start pre-compliance testing during DFM. Saves 4-8 weeks and $5-10K.")
    c.drawString(M + 25, tip_y + 6, "We include pre-compliance checks in our standard engineering process.")

    # =================================================================
    # SLIDE 7: FREE TOOLS  --  white background
    # =================================================================
    new_white_slide("top")

    c.setFillColor(NAVY)
    c.setFont(SANS_BOLD, 42)
    c.drawString(M, H - 60, "Free Tools")
    c.setFillColor(SLATE)
    c.setFont(SANS, 14)
    c.drawString(M, H - 82, "No signup required. Start estimating your project now.")

    y_start = H - 110
    card_w = (CW - 25) / 2
    card_h = 170
    for idx, (title, desc, url) in enumerate(FREE_TOOLS):
        col = idx % 2
        row = idx // 2
        bx = M + col * (card_w + 25)
        by = y_start - row * (card_h + 15) - card_h

        c.setFillColor(Color(0.97, 0.97, 0.97, 1))
        c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.15))
        c.setLineWidth(0.4)
        c.roundRect(bx, by, card_w, card_h, 4, fill=1, stroke=1)
        c.setFillColor(TEAL)
        c.rect(bx, by, 3, card_h, fill=1, stroke=0)

        c.setFillColor(TEAL)
        c.circle(bx + 22, by + card_h - 20, 12, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 12)
        c.drawCentredString(bx + 22, by + card_h - 24, str(idx + 1))

        c.setFillColor(NAVY)
        c.setFont(SANS_BOLD, 14)
        c.drawString(bx + 40, by + card_h - 24, title)

        c.setFillColor(SLATE)
        c.setFont(SANS, 11)
        lines = wrap_text(c, desc, SANS, 11, card_w - 28)
        ty = by + card_h - 45
        for ln in lines:
            c.drawString(bx + 14, ty, ln)
            ty -= 14

        c.setFillColor(TEAL)
        c.setFont(SANS_BOLD, 10)
        c.drawString(bx + 14, by + 10, url)

    # =================================================================
    # SLIDE 8: WHY BREEZE  --  pcb-closeup FULL BLEED + navy 80%
    # =================================================================
    c.showPage()
    page_num[0] += 1
    draw_photo_bg(c, PHOTO_PCB, W, H, overlay_alpha=0.80)
    draw_footer(c, W, page_num[0] - 1, footer_y=15, font_size=10,
                text_color=Color(1, 1, 1, 0.5))

    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 42)
    c.drawString(M + 10, H - 60, "Why Breeze?")
    c.setFillColor(Color(1, 1, 1, 0.7))
    c.setFont(SANS, 16)
    c.drawString(M + 10, H - 84, "Four reasons founders choose us over brokers and trading companies.")

    y_start = H - 115
    card_w = (CW - 30) / 2
    card_h = 120
    for idx, (title, desc) in enumerate(DIFFERENTIATORS):
        col = idx % 2
        row = idx // 2
        bx = M + 10 + col * (card_w + 20)
        by = y_start - row * (card_h + 15) - card_h

        c.setFillColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.20))
        c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.5))
        c.setLineWidth(0.5)
        c.roundRect(bx, by, card_w, card_h, 5, fill=1, stroke=1)
        c.setFillColor(TEAL)
        c.rect(bx + 5, by + card_h - 3, card_w - 10, 3, fill=1, stroke=0)

        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 14)
        c.drawString(bx + 14, by + card_h - 24, title)

        c.setFillColor(Color(1, 1, 1, 0.85))
        c.setFont(SANS, 12)
        lines = wrap_text(c, desc, SANS, 12, card_w - 28)
        ty = by + card_h - 44
        for ln in lines:
            c.drawString(bx + 14, ty, ln)
            ty -= 15

    # Bottom bar
    bar_y = 32
    c.setFillColor(Color(0, 0, 0, 0.3))
    c.roundRect(M + 10, bar_y, CW - 20, 32, 4, fill=1, stroke=0)
    c.setFillColor(Color(1, 1, 1, 0.85))
    c.setFont(SANS, 11)
    c.drawCentredString(W/2, bar_y + 10,
                        "Trading companies: 20-40% margin, zero engineering.  |  "
                        "In-house: $500K+/yr, 6+ months to hire.  |  Breeze: ready now.")

    # =================================================================
    # SLIDE 9: NEXT STEPS / CONTACT  --  navy solid + teal accents
    # =================================================================
    c.showPage()
    page_num[0] += 1
    c.setFillColor(DEEP_NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    draw_circuit_traces(c, 0, 0, W, H, opacity=0.08, density=10, seed=3001)

    # Teal accent elements
    c.setFillColor(TEAL)
    c.rect(0, H - 4, W, 4, fill=1, stroke=0)
    c.rect(W/2 - 50, H - 90, 100, 3, fill=1, stroke=0)

    c.setFillColor(WHITE)
    c.setFont(SANS_BOLD, 42)
    c.drawCentredString(W/2, H - 75, "Ready to Start?")

    next_steps = [
        ("1", "Try Our Free Tools", "breezehw.com/tools -- no signup"),
        ("2", "Book a Scoping Call", "30 min -- feasibility + cost range"),
        ("3", "Get Your NRE Proposal", "Fixed pricing, clear timeline"),
    ]

    step_w = 240
    step_h = 85
    gap = 30
    total = 3 * step_w + 2 * gap
    sx_start = W/2 - total/2

    for i, (num, title, desc) in enumerate(next_steps):
        bx = sx_start + i * (step_w + gap)
        by = H/2 - step_h/2 - 20

        c.setFillColor(Color(1, 1, 1, 0.08))
        c.setStrokeColor(Color(TEAL_R, TEAL_G, TEAL_B, 0.3))
        c.setLineWidth(0.5)
        c.roundRect(bx, by, step_w, step_h, 5, fill=1, stroke=1)

        c.setFillColor(TEAL)
        c.circle(bx + step_w/2, by + step_h - 18, 14, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 14)
        c.drawCentredString(bx + step_w/2, by + step_h - 23, num)

        c.setFillColor(WHITE)
        c.setFont(SANS_BOLD, 14)
        c.drawCentredString(bx + step_w/2, by + 35, title)

        c.setFillColor(Color(1, 1, 1, 0.6))
        c.setFont(SANS, 12)
        c.drawCentredString(bx + step_w/2, by + 14, desc)

    # Logo + contact
    logo_w = 160
    logo_h = logo_w * 202 / 1168
    c.drawImage(LOGO_WHITE, W/2 - logo_w/2, 60, logo_w, logo_h, mask='auto')
    c.setFillColor(Color(1, 1, 1, 0.5))
    c.setFont(SANS, 11)
    c.drawCentredString(W/2, 42, "hello@breezehw.com  |  breezehw.com")
    c.setFillColor(Color(1, 1, 1, 0.35))
    c.setFont(SANS, 9)
    c.drawCentredString(W/2, 25, "No equity. No MOQ surprises. Just engineering.")

    c.save()
    print(f"Landscape deck saved: {OUT_DECK}")


# =====================================================================
# Main
# =====================================================================

if __name__ == "__main__":
    generate_portrait_kit()
    generate_landscape_deck()

    shutil.copy2(OUT_KIT, os.path.join(DOWNLOADS, "Breeze-Outreach-Kit-2026.pdf"))
    shutil.copy2(OUT_DECK, os.path.join(DOWNLOADS, "Breeze-Deck-2026.pdf"))
    print(f"Copies saved to ~/Downloads/")
    print("Done.")
