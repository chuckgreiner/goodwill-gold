# Goodwill Gold - Feature Flow Documentation

## Complete User Journey: From Scan to Sale

### Flow 1: AI Scanner → Value Discovery → Decision

**Starting Point:** User finds an item at a thrift store

1. **Open Scanner**
   - User taps "Scanner" in bottom navigation
   - Sees clean camera interface with instructions
   - Two options: "Open Camera" or "Upload Photo"

2. **Capture Item**
   - User positions item in frame (focus on brand tags/logos)
   - Taps "Capture" button
   - AI processing animation plays (2 seconds)
   - Success toast: "✨ Found it! Here's what we know..."

3. **View Results**
   - **Brand & Category**: Large, bold display (e.g., "Lululemon - Align Leggings")
   - **Trend Badge**: Visual indicator (🔥 Trending Now / 💎 Rare Find / ⭐ Steady Seller)
   - **Value Estimation**: Price range displayed prominently ($45-$75)
   - **Confidence Score**: AI confidence percentage (95%)
   - **Additional Info**: Condition rating, average sale time

4. **Take Action**
   - **Option A**: "Add to My Inventory" (saves for later listing)
   - **Option B**: "View Similar Sold Items" (see marketplace comparables)
   - **Option C**: Reset and scan another item

5. **Decision Point**
   - **If high value + trending**: Strong buy signal → User purchases item
   - **If low value**: User passes on item
   - **If uncertain**: User checks "Similar Sold Items" for validation

**Success Metric**: User makes confident buying decision within 30 seconds of scanning

---

### Flow 2: Trend Research → Store Visit → Targeted Hunting

**Starting Point:** User wants to know what's hot before going thrifting

1. **Check Trends**
   - User opens "Trends" tab
   - Browses categories: All / Y2K Fashion / Designer / Sneakers
   - Sees real-time data: "Lululemon Align Leggings - $58 avg, 342 sold this week"

2. **Mental Shopping List**
   - User notes trending items:
     - Lululemon athleisure (hot)
     - Vintage Levi's 501s (hot)
     - Patagonia fleece (rising)
     - Juicy Couture tracksuits (Y2K trend)

3. **Visit Store**
   - User goes to thrift store with target brands in mind
   - Uses Scanner to verify items match trending categories
   - Checks estimated values against purchase price

4. **Validate Finds**
   - Scans potential items
   - Compares scanner results to trend data
   - Makes informed purchase decisions

**Success Metric**: User finds at least one trending item per store visit

---

### Flow 3: Community Discovery → Inspiration → Action

**Starting Point:** User browses community feed for inspiration

1. **Browse Feed**
   - User opens "Feed" tab
   - Scrolls through community finds
   - Sees high-value finds: "Kate Spade Crossbody - $125" with 256 likes

2. **Get Inspired**
   - User notices patterns:
     - Certain brands appear frequently (Lululemon, Kate Spade)
     - Specific stores mentioned (Goodwill Outlet, Buffalo Exchange)
     - Trend badges show what's hot

3. **Learn from Community**
   - Reads store notes from other users
   - Sees which items get most engagement
   - Discovers new brands to look for

4. **Apply Knowledge**
   - User visits mentioned stores
   - Searches for similar brands
   - Uses Scanner to verify finds
   - Shares own discoveries back to community

**Success Metric**: User discovers new profitable brands through community

---

### Flow 4: Store Management → Optimization → Efficiency

**Starting Point:** User wants to track favorite thrift locations

1. **Add Store**
   - User taps "Stores" tab → "+ Add Store"
   - Enters store name, type, address
   - Adds initial notes (e.g., "Great for vintage Nike")

2. **Track Visits**
   - After each visit, user updates:
     - Last visit date (automatically tracked)
     - Total finds count
     - Rating (1-5 stars)
     - Notes (new observations)

3. **Build Knowledge Base**
   - User accumulates store intelligence:
     - "New stock on Mondays"
     - "Check back racks for hidden gems"
     - "Half-off Saturdays"
     - "Best for Lululemon and designer bags"

4. **Optimize Route**
   - User reviews store ratings and find counts
   - Plans thrift route based on:
     - Highest-rated stores
     - Most finds per visit
     - Distance from home
     - New stock days

**Success Metric**: User increases finds per hour by optimizing store visits

---

## Mock Feature Flow: Complete Session Example

### Scenario: Sarah's Saturday Thrift Run

**9:00 AM - Pre-Trip Planning**
- Opens Goodwill Gold app
- Checks "Trends" tab
- Notes: Lululemon, Patagonia, and Y2K items are hot
- Reviews "Stores" tab
- Sees "Goodwill Downtown" has new stock on Mondays (yesterday)
- Plans to visit Goodwill Downtown first

**10:00 AM - Goodwill Downtown**
- Arrives at store
- Starts browsing athletic wear section
- Finds black leggings with Lululemon tag
- Opens Scanner → Captures item
- Result: "Lululemon Align Leggings - $58-75, 🔥 Trending Now"
- Purchase price: $6.99
- **Decision: BUY** (potential $50+ profit)

**10:15 AM - Same Store, Outerwear Section**
- Finds Patagonia fleece jacket
- Scans item
- Result: "Patagonia Fleece - $65-85, 📈 Rising"
- Purchase price: $12.99
- **Decision: BUY** (potential $50+ profit)

**10:30 AM - Checkout & Share**
- Purchases both items for $19.98
- Opens "Feed" tab → Taps "Share Find"
- Posts Lululemon find with photo
- Adds caption: "Found at Goodwill Downtown! 🔥"
- Receives likes and comments from community

**11:00 AM - Update Store Notes**
- Opens "Stores" tab
- Updates "Goodwill Downtown":
  - Total finds: 24 → 26
  - Last visit: Updated to today
  - New note: "Great Lululemon and Patagonia haul today!"
  - Rating: Maintains 4.5 stars

**Result**: Sarah spent $19.98 and found items worth $120-160, potential profit of $100+

---

## Key Interaction Patterns

### Progressive Disclosure
- Scanner starts simple (just camera)
- Results reveal progressively: Brand → Value → Details → Actions
- Prevents overwhelming new users

### Instant Feedback
- Every action has immediate response
- Toasts for success/error states
- Loading states clearly communicated
- Confidence scores build trust

### Social Proof
- Community feed shows others' successes
- Trend data validates buying decisions
- Store ratings from other users
- Like counts indicate valuable finds

### Gamification Elements
- Achievement badges (not yet implemented)
- Find counts and value totals
- Community leaderboards (future)
- Streak tracking for consistent users (future)

---

## Future Flow Enhancements

### Inventory Management (Not Yet Built)
1. User scans item → Adds to inventory
2. Inventory shows: Photo, Brand, Value, Status (Listed/Sold/Keeping)
3. Filter by: Category, Value, Trend status
4. Track: Purchase price, Sale price, Profit margin

### Onboarding Flow (Not Yet Built)
1. Welcome screen with tagline
2. Feature carousel (4 screens):
   - Scanner capabilities
   - Trend tracking
   - Community features
   - Store management
3. Permission requests (camera, location)
4. Quick tutorial: "Try scanning your first item!"

### Advanced Features (Future)
- Price negotiation calculator
- Cross-listing to multiple platforms
- Profit tracking and analytics
- Seasonal trend predictions
- Store visit reminders
- Barcode scanning for faster identification
