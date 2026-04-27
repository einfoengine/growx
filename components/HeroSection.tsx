"use client";

import React from "react";
import Image from "next/image";
import {
  MonitorPlay,
  Share2,
  Code2,
  PenTool,
  BarChart3,
  Search,
} from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroBackground} />
      <div className={styles.heroGradient} />

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>S</div>
          <span>Scalify</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>
            Services
          </a>
          <a href="#" className={styles.navLink}>
            Solutions
          </a>
          <a href="#" className={styles.navLink}>
            Agencies
          </a>
          <a href="#" className={styles.navLink}>
            Resources
          </a>
        </div>
        <div className={styles.navButtons}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.getStartedBtn}>Get Started</button>
        </div>
      </nav>

      {/* Connecting Lines (Dashed) */}
      <div className={styles.dashedLine} style={{ transform: "rotate(45deg)", left: "30%", top: "30%" }}></div>
      <div className={styles.dashedLine} style={{ transform: "rotate(-45deg)", left: "70%", top: "30%" }}></div>
      <div className={styles.dashedLine} style={{ transform: "rotate(135deg)", left: "30%", top: "70%" }}></div>
      <div className={styles.dashedLine} style={{ transform: "rotate(-135deg)", left: "70%", top: "70%" }}></div>

      {/* Floating Elements layer */}
      <div className={styles.floatingElements}>
        {/* Floating Cards */}
        <div className={`${styles.floatingCard} ${styles["top-left"]}`}>
          <div className={styles.cardTitle}>Web Design</div>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <PenTool size={20} color="#8b5cf6" />
            </div>
            <div className={styles.cardLines}>
              <div className={`${styles.cardLine} ${styles.long}`}></div>
              <div className={`${styles.cardLine} ${styles.short}`}></div>
            </div>
          </div>
        </div>

        <div className={`${styles.floatingCard} ${styles["top-right"]}`}>
          <div className={styles.cardTitle}>SEO Optimization</div>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <Search size={20} color="#3b82f6" />
            </div>
            <div className={styles.cardLines}>
              <div className={`${styles.cardLine} ${styles.long}`}></div>
              <div className={`${styles.cardLine} ${styles.short}`}></div>
            </div>
          </div>
        </div>

        <div className={`${styles.floatingCard} ${styles["bottom-left"]}`}>
          <div className={styles.cardTitle}>SMM Campaigns</div>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <Share2 size={20} color="#ec4899" />
            </div>
            <div className={styles.cardLines}>
              <div className={`${styles.cardLine} ${styles.long}`}></div>
              <div className={`${styles.cardLine} ${styles.short}`}></div>
            </div>
          </div>
        </div>

        <div className={`${styles.floatingCard} ${styles["bottom-right"]}`}>
          <div className={styles.cardTitle}>Web Development</div>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <Code2 size={20} color="#10b981" />
            </div>
            <div className={styles.cardLines}>
              <div className={`${styles.cardLine} ${styles.long}`}></div>
              <div className={`${styles.cardLine} ${styles.short}`}></div>
            </div>
          </div>
        </div>

        {/* Small floating platform icons */}
        <div className={`${styles.floatingIcon} ${styles["icon-1"]}`}>
          <MonitorPlay size={24} />
        </div>
        <div className={`${styles.floatingIcon} ${styles["icon-2"]}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
        </div>
        <div className={`${styles.floatingIcon} ${styles["icon-3"]}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </div>
        <div className={`${styles.floatingIcon} ${styles["icon-4"]}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </div>
        <div className={`${styles.floatingIcon} ${styles["icon-5"]}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
        </div>
      </div>

      {/* Main Center Content */}
      <main className={styles.mainContent}>
        <div className={styles.centerIcon}>
          <BarChart3 color="#8b5cf6" size={32} />
        </div>

        <h1 className={styles.title}>
          Ultimate Fulfillment Partner for{" "}
          <br className="hidden md:block" />
          <span className={styles.gradientText}>Marketing Agencies</span>
        </h1>

        <p className={styles.subtitle}>
          The all-in-one fulfillment solution that handles Web Design, Development, SMM, SEO, and PPC. 
          Scale your agency. 10x Growth. Automated.
        </p>

        <div className={styles.socialProof}>
          <div className={styles.avatars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.avatar}>
                <Image
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt={`User ${i}`}
                  width={36}
                  height={36}
                />
              </div>
            ))}
          </div>
          <span className={styles.trustText}>4M+ trusted users</span>
        </div>

        <button className={styles.mainCta}>Get Started for Free</button>
        <span className={styles.noCreditCard}>No credit card required.</span>
      </main>
    </div>
  );
}
