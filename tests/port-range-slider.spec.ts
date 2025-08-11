import { test, expect } from '@playwright/test';

test.describe('端口范围滑块功能测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('应该能够手动输入最小值和最大值', async ({ page }) => {
    // 等待页面加载
    await page.waitForSelector('input[type="number"]');
    
    // 找到最小值和最大值输入框
    const minInput = page.locator('input[type="number"]').first();
    const maxInput = page.locator('input[type="number"]').nth(1);
    
    // 清空并输入新的值
    await minInput.clear();
    await minInput.fill('1000');
    
    await maxInput.clear();
    await maxInput.fill('5000');
    
    // 验证输入框的值
    await expect(minInput).toHaveValue('1000');
    await expect(maxInput).toHaveValue('5000');
  });

  test('拖动条范围应该跟随输入框值变化', async ({ page }) => {
    // 等待页面加载
    await page.waitForSelector('input[type="number"]');
    
    // 找到最小值和最大值输入框
    const minInput = page.locator('input[type="number"]').first();
    const maxInput = page.locator('input[type="number"]').nth(1);
    
    // 输入一个很大的值来测试拖动条范围扩展
    await maxInput.clear();
    await maxInput.fill('65000');
    
    // 等待一下让状态更新
    await page.waitForTimeout(500);
    
    // 验证拖动条的最大值已经扩展
    const slider = page.locator('[role="slider"]').first();
    const maxValue = await slider.getAttribute('aria-valuemax');
    
    // 拖动条的最大值应该能够容纳我们输入的值
    expect(parseInt(maxValue || '0')).toBeGreaterThanOrEqual(65000);
  });

  test('应该能够保存用户输入的值到localStorage', async ({ page }) => {
    // 等待页面加载
    await page.waitForSelector('input[type="number"]');
    
    // 找到最小值和最大值输入框
    const minInput = page.locator('input[type="number"]').first();
    const maxInput = page.locator('input[type="number"]').nth(1);
    
    // 输入新的值
    await minInput.clear();
    await minInput.fill('2000');
    
    await maxInput.clear();
    await maxInput.fill('8000');
    
    // 等待一下让localStorage保存
    await page.waitForTimeout(500);
    
    // 检查localStorage中是否保存了值
    const minPort = await page.evaluate(() => localStorage.getItem('minPort'));
    const maxPort = await page.evaluate(() => localStorage.getItem('maxPort'));
    
    expect(minPort).toBe('2000');
    expect(maxPort).toBe('8000');
  });

  test('页面刷新后应该恢复保存的值', async ({ page }) => {
    // 等待页面加载
    await page.waitForSelector('input[type="number"]');
    
    // 找到最小值和最大值输入框
    const minInput = page.locator('input[type="number"]').first();
    const maxInput = page.locator('input[type="number"]').nth(1);
    
    // 输入新的值
    await minInput.clear();
    await minInput.fill('3000');
    
    await maxInput.clear();
    await maxInput.fill('9000');
    
    // 等待一下让localStorage保存
    await page.waitForTimeout(500);
    
    // 刷新页面
    await page.reload();
    
    // 等待页面重新加载
    await page.waitForSelector('input[type="number"]');
    
    // 验证值是否恢复
    const newMinInput = page.locator('input[type="number"]').first();
    const newMaxInput = page.locator('input[type="number"]').nth(1);
    
    await expect(newMinInput).toHaveValue('3000');
    await expect(newMaxInput).toHaveValue('9000');
  });

  test('拖动条应该能够响应输入框的变化', async ({ page }) => {
    // 等待页面加载
    await page.waitForSelector('input[type="number"]');
    
    // 找到拖动条
    const slider = page.locator('[role="slider"]').first();
    
    // 获取初始的拖动条值
    const initialMinValue = await slider.getAttribute('aria-valuenow');
    
    // 修改最小值输入框
    const minInput = page.locator('input[type="number"]').first();
    await minInput.clear();
    await minInput.fill('4000');
    
    // 等待一下让状态更新
    await page.waitForTimeout(500);
    
    // 验证拖动条的值是否更新
    const newMinValue = await slider.getAttribute('aria-valuenow');
    expect(newMinValue).toBe('4000');
  });
}); 