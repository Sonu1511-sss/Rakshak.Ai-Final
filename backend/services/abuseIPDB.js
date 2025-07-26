const axios = require('axios');

class AbuseIPDBService {
  constructor() {
    this.apiKey = process.env.ABUSEIPDB_API_KEY;
    this.baseURL = 'https://api.abuseipdb.com/api/v2';
  }

  async checkIP(ip) {
    try {
      if (!this.apiKey) {
        console.warn('AbuseIPDB API key not configured');
        return this.getMockData(ip);
      }

      const response = await axios.get(`${this.baseURL}/check`, {
        headers: {
          'Key': this.apiKey,
          'Accept': 'application/json'
        },
        params: {
          ipAddress: ip,
          maxAgeInDays: 90,
          verbose: true
        }
      });

      return {
        ip,
        abuseConfidenceScore: response.data.abuseConfidenceScore,
        countryCode: response.data.countryCode,
        countryName: response.data.countryName,
        usageType: response.data.usageType,
        isp: response.data.isp,
        totalReports: response.data.totalReports,
        isWhitelisted: response.data.isWhitelisted,
        lastReportedAt: response.data.lastReportedAt
      };
    } catch (error) {
      console.error('Error checking IP with AbuseIPDB:', error.message);
      return this.getMockData(ip);
    }
  }

  getMockData(ip) {
    // Return mock data when API is not available
    return {
      ip,
      abuseConfidenceScore: Math.floor(Math.random() * 100),
      countryCode: 'US',
      countryName: 'United States',
      usageType: 'residential',
      isp: 'Example ISP',
      totalReports: Math.floor(Math.random() * 50),
      isWhitelisted: false,
      lastReportedAt: new Date().toISOString(),
      mock: true
    };
  }

  async reportIP(ip, categories, comment) {
    try {
      if (!this.apiKey) {
        console.warn('AbuseIPDB API key not configured');
        return { success: false, mock: true };
      }

      const response = await axios.post(`${this.baseURL}/report`, {
        ip,
        categories: categories.join(','),
        comment
      }, {
        headers: {
          'Key': this.apiKey,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        abuseConfidenceScore: response.data.abuseConfidenceScore
      };
    } catch (error) {
      console.error('Error reporting IP to AbuseIPDB:', error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new AbuseIPDBService();