const fs = require('fs').promises;
const path = require('path');

const PAGES_FILE = path.join(__dirname, '../../data/pages.json');

/**
 * Pages File Storage
 * Manages static pages data in JSON file
 */
class PagesStorage {
  constructor() {
    this.ensureDataFile();
  }

  /**
   * Ensure data file exists
   */
  async ensureDataFile() {
    try {
      await fs.access(PAGES_FILE);
    } catch {
      const defaultData = {
        about: { id: 'about', title: 'About Us', titleUz: 'Biz haqimizda', content: {}, updatedAt: new Date().toISOString() },
        contact: { id: 'contact', title: 'Contact Us', titleUz: 'Biz bilan bog\'laning', info: {}, updatedAt: new Date().toISOString() },
        faq: { id: 'faq', title: 'FAQ', titleUz: 'Ko\'p so\'raladigan savollar', categories: [], updatedAt: new Date().toISOString() },
        visa: { id: 'visa', title: 'Visa Information', titleUz: 'Viza ma\'lumotlari', updatedAt: new Date().toISOString() }
      };
      await fs.writeFile(PAGES_FILE, JSON.stringify(defaultData, null, 2));
    }
  }

  /**
   * Read all pages data
   */
  async findAll() {
    try {
      const data = await fs.readFile(PAGES_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading pages:', error);
      return {};
    }
  }

  /**
   * Get specific page by ID
   */
  async findById(pageId) {
    const pages = await this.findAll();
    return pages[pageId] || null;
  }

  /**
   * Update a page
   */
  async update(pageId, updates) {
    const pages = await this.findAll();

    if (!pages[pageId]) {
      return null;
    }

    pages[pageId] = {
      ...pages[pageId],
      ...updates,
      id: pageId,
      updatedAt: new Date().toISOString()
    };

    await fs.writeFile(PAGES_FILE, JSON.stringify(pages, null, 2));
    return pages[pageId];
  }

  /**
   * Update About page
   */
  async updateAbout(data) {
    return await this.update('about', data);
  }

  /**
   * Update Contact page
   */
  async updateContact(data) {
    return await this.update('contact', data);
  }

  /**
   * Update FAQ page
   */
  async updateFaq(data) {
    return await this.update('faq', data);
  }

  /**
   * Add FAQ question to a category
   */
  async addFaqQuestion(categoryIndex, question) {
    const pages = await this.findAll();
    const faq = pages.faq;

    if (!faq.categories[categoryIndex]) {
      return null;
    }

    faq.categories[categoryIndex].questions.push(question);
    faq.updatedAt = new Date().toISOString();

    await fs.writeFile(PAGES_FILE, JSON.stringify(pages, null, 2));
    return faq;
  }

  /**
   * Remove FAQ question
   */
  async removeFaqQuestion(categoryIndex, questionIndex) {
    const pages = await this.findAll();
    const faq = pages.faq;

    if (!faq.categories[categoryIndex] || !faq.categories[categoryIndex].questions[questionIndex]) {
      return null;
    }

    faq.categories[categoryIndex].questions.splice(questionIndex, 1);
    faq.updatedAt = new Date().toISOString();

    await fs.writeFile(PAGES_FILE, JSON.stringify(pages, null, 2));
    return faq;
  }

  /**
   * Update Visa page
   */
  async updateVisa(data) {
    return await this.update('visa', data);
  }

  /**
   * Add team member to About page
   */
  async addTeamMember(member) {
    const pages = await this.findAll();
    const about = pages.about;

    if (!about.team) {
      about.team = [];
    }

    member.id = Date.now().toString();
    about.team.push(member);
    about.updatedAt = new Date().toISOString();

    await fs.writeFile(PAGES_FILE, JSON.stringify(pages, null, 2));
    return about;
  }

  /**
   * Remove team member
   */
  async removeTeamMember(memberId) {
    const pages = await this.findAll();
    const about = pages.about;

    if (!about.team) {
      return null;
    }

    about.team = about.team.filter(m => m.id !== memberId);
    about.updatedAt = new Date().toISOString();

    await fs.writeFile(PAGES_FILE, JSON.stringify(pages, null, 2));
    return about;
  }
}

module.exports = new PagesStorage();
